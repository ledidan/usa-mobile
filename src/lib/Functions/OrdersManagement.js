/* eslint-disable no-throw-literal */
// BUTI DINERS, INC. All right Reserved ©

import dayjs from "dayjs";
import DateTime from "./DateTime";
import { Functions } from "lib";

import { _onPrintWithEpson, _onPrintWithStar } from "./Printer";

const { _convertUTCTimestampToLocalTime } = DateTime;``

// Constants
const DEFAULT_TIMESTAMP = "1980-01-01T00:00:00.000Z";

const RankActiveOrders = (activeOrders = {}) => {
  let rankedOrders = {};
  Object.keys(activeOrders)
    .sort((a, b) => {
      const obj1 = activeOrders[a];
      const obj2 = activeOrders[b];
      const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
      const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
      return dayjs(timeStamp2).diff(dayjs(timeStamp1));
      // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
      // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
      // if (status1_score === status2_score) {
      //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
      //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
      //   return differenceInMinutes(timeStamp2, timeStamp1);
      // }
      // return status2_score - status1_score;
    })
    .forEach(key => (rankedOrders[key] = activeOrders[key]));
  return rankedOrders;
};

const RankPastOrders = (pastOrders = {}) => {
  let rankedPastOrders = {};
  Object.keys(pastOrders)
    .sort((a, b) => {
      const obj1 = pastOrders[a];
      const obj2 = pastOrders[b];
      const closedAt1 = obj1.closedAt || DEFAULT_TIMESTAMP;
      const closedAt2 = obj2.closedAt || DEFAULT_TIMESTAMP;
      return dayjs(closedAt2).diff(dayjs(closedAt1));
    })
    .forEach(key => {
      rankedPastOrders[key] = pastOrders[key];
    });
  return rankedPastOrders;
};

const showWarning = message => {
  const { ShowConfirmNotif } = Functions;
  ShowConfirmNotif({
    title: "Warning!",
    message,
    type: "error",
    props: { displayType: "warning" },
  });
};
const _printOrder = async ({
  printerName = "",
  printerInfo = {},
  printerBrand = "epson",
  orderID = "",
  BleManager,
  shopBasicInfo,
  receiptSources,
  updatePrinterInfo = false,
}) => {
  if (Object.keys(printerInfo).length === 0 || !printerBrand) {
    //reject("Printer not found");
    showWarning("Printer Not Found");
    return;
  }
  if (!orderID) {
    // reject("Order ID is required");
    return;
  }
  // if (printerBrand !== "epson") {
  //   var { star } = receiptSources;
  // }
  // if (printerBrand === "star") {
  //   var { star } = receiptSources;
  // }
  if (printerBrand !== "star") {
    return await _onPrintWithEpson({
      printerName,
      printerInfo,
      BleManager,
      shopBasicInfo,
      receiptSource: receiptSources,
      updatePrinterInfo,
    });
  } else {
    const { star } = receiptSources;
    return await _onPrintWithStar({
      printerName,
      printerInfo,
      receiptSource: star.uri,
      updatePrinterInfo,
    });
  }
};

export default {
  _printOrder,
  RankActiveOrders,
  RankPastOrders,
};
