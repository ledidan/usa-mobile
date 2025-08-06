// BUTI DINERS, INC. All right Reserved ©

import {
  BLEPrinter,
  NetPrinter,
} from "@poriyaalar/react-native-thermal-receipt-printer";
import ThermalPrinter from "react-native-thermal-printer";

import {
  InterfaceType,
  StarConnectionSettings,
  StarXpandCommand,
  StarPrinter,
} from "react-native-star-io10";
import * as Sentry from "@sentry/react-native";

// import Ping from 'react-native-ping';
import DateTime from "./DateTime";
// import RNFetchBlob from "rn-fetch-blob";
const { _convertUTCTimestampToLocalTime } = DateTime;
import Functions from "./index";

const showWarning = message => {
  const { ShowConfirmNotif } = Functions;
  ShowConfirmNotif({
    title: "Warning!",
    message,
    type: "error",
    props: { displayType: "warning" },
  });
};

const _initBlePrinter = () => {
  return new Promise((resolve, reject) => {
    BLEPrinter.init()
      .then(() => {
        return BLEPrinter.getDeviceList()
          .then(devices => devices)
          .catch(err => reject(err));
      })
      .then(devices => resolve(devices))
      .catch(err => {
        reject(err);
      });
  });
};
const _getBlePrinters = () => {
  return new Promise((resolve, reject) => {
    BLEPrinter.getDeviceList()
      .then(devices => resolve(devices))
      .catch(err => reject(err));
  });
};
const _initLanPrinter = () => {
  // NetPrinter.init();
};
const _onPrintWithEpson = async ({
  printerName,
  printerInfo = {},
  BleManager,
  shopBasicInfo,
  receiptSource,
  updatePrinterInfo,
}) => {
  const { connectType, ipAddress, macAddress, printerModel } = printerInfo;
  if (connectType === "lan") {
    try {
      // await Ping.start(ipAddress, { timeout: 1000 });

      await ThermalPrinter.printTcp({
        ip: ipAddress,
        port: 9100,
        payload: receiptSource || "Sample text\n",
        autoCut: true,
        openCashbox: false,
        mmFeedPaper: 60,
        printerDpi: 203,
        printerWidthMM: 80,
        printerNbrCharactersPerLine: 48,
      });
      // if (itemCount >= 9) {
      // await NetPrinter.printBill(receiptSource);
      // } else {
      //   await NetPrinter.printImage(receiptSource, 576);
      // }
      return Promise.resolve(true);
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          message: "Error in _onPrintWithEpson ThermalPrinter",
          printerInfo,
        },
      });
      if (!updatePrinterInfo) {
        showWarning(`${printerName} was not able to print`);
      }
      // NetPrinter.closeConn();
      return Promise.resolve(false);
    } finally {
      // NetPrinter.closeConn();
    }
  } else {
    try {
      const Device = await BleManager.connectToDevice(macAddress, {
        timeout: 1000,
      });
      await Device.cancelConnection();
      await BLEPrinter.connectPrinter(macAddress);
      // await BLEPrinter.printImage(receiptSource, 576);
      // await NetPrinter.printBill(receiptSource);
      return Promise.resolve(true);
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          message: "Error in _onPrintWithEpson BLEPrinter",
          printerInfo,
        },
      });
      // if (err.message.includes("The device is in use"))
      //   showWarning(`${printerName} is busy. Please wait`);
      showWarning(`${printerName} was not able to print`);
      BLEPrinter.closeConn();
      return Promise.resolve(false);
    } finally {
      BLEPrinter.closeConn();
    }
  }
};

const _onPrintWithStar = async ({
  printerName,
  printerInfo = {},
  receiptSource,
  updatePrinterInfo,
}) => {
  const { connectType, ipAddress, macAddress, printerModel = "" } = printerInfo;
  const settings = new StarConnectionSettings();
  settings.interfaceType =
    connectType === "lan" ? InterfaceType.Lan : InterfaceType.Bluetooth;
  settings.identifier = connectType === "lan" ? ipAddress : macAddress;
  const printer = new StarPrinter(settings);
  try {
    let builder = new StarXpandCommand.StarXpandCommandBuilder();
    builder.addDocument(
      new StarXpandCommand.DocumentBuilder().addPrinter(
        new StarXpandCommand.PrinterBuilder()
          .actionPrintImage(
            new StarXpandCommand.Printer.ImageParameter(
              receiptSource,
              printerModel === "sp700" ? 230 : 576,
            ), //width(dots) SP700 230
          )
          .actionCut(StarXpandCommand.Printer.CutType.Partial),
      ),
    );
    let commands = await builder.getCommands();
    await printer.open();
    await printer.print(commands);
    return Promise.resolve(true);
  } catch (err) {
    Sentry.captureException(err, {
      extra: {
        message: "Error in _onPrintWithStar",
        printerInfo,
      },
    });
    if (err.message.includes("The device is in use")) {
      showWarning(`${printerName} is busy. Please wait...`);
    } else if (!updatePrinterInfo) {
      showWarning(`${printerName} was not able to print`);
    }
    await printer.close();
    await printer.dispose();
    return Promise.resolve(false);
  } finally {
    await printer.close();
    await printer.dispose();
  }
};

export {
  _initBlePrinter,
  _getBlePrinters,
  _initLanPrinter,
  _onPrintWithEpson,
  _onPrintWithStar,
};
