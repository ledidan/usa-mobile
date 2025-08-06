import React, { Component } from "react";
import { del } from "object-path-immutable";
import { Text, ScrollView, View, Image } from "react-native";
import { Surface, Button, Title, IconButton, Switch } from "react-native-paper";

//Style
import Style from "./style";
import colors from "styles/_variables";

//Icons
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";

//Image
import StarPrinterLogo from "assets/Images/star-micronics-logo.png";
import EpsonPrinterLogo from "assets/Images/epson-logo.png";

//context
import { MerchantInterfaceConsumer, withContext } from "context";

//Components
import { InfoCard, Modals, Orders } from "components";

//lib
import { Functions, Services } from "lib";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import * as Sentry from "@sentry/react-native";

export class Settings extends Component {
  state = {
    openRegisterModal: false,
    openEditModal: false,
    openConfirmPinModal: false,
    openSelectPortModal: false,
    printerInfo: {},
    printerID: "",
    isRefreshing: false,
    receiptSources: {},
    editing: false,
    isPrinting: false,
  };

  onOpenRegisterModal = () => this.setState({ openRegisterModal: true });
  onCloseRegisterModal = () => this.setState({ openRegisterModal: false });

  onCloseEditModal = async () => {
    this.setState({ openEditModal: false, editing: false });
    // const { context } = this.props;
    // const { onGetMobileAppActivePrinters } = context;
    // await onGetMobileAppActivePrinters();
  };

  onOpenEditModal = ({ printerInfo, printerID }) => {
    this.setState({
      printerInfo,
      openEditModal: true,
      printerID,
      openConfirmPinModal: false,
      editing: true,
    });
  };

  onOpenConfirmOwnerPinModal = ({ printerInfo, printerID }) => {
    this.setState({ openConfirmPinModal: true, printerInfo, printerID });
  };

  onCloseConfirmOwnerPinModal = () =>
    this.setState({ openConfirmPinModal: false });

  onOpenSelectPortModal = () => this.setState({ openSelectPortModal: true });

  onCloseSelectPortModal = () => this.setState({ openSelectPortModal: false });

  onShowWarning = message => {
    const { ShowConfirmNotif } = Functions;
    ShowConfirmNotif({
      title: "Warning!",
      message,
      type: "error",
      props: { displayType: "warning" },
    });
  };

  onHandleSuccess = ({ addedPrinters, printerID, printerInfo = {} }) => {
    const { ShowConfirmNotif } = Functions;
    const { context = {} } = this.props;
    const { onUpdateAddedPrinters } = context;
    const { printerName = "" } = printerInfo;
    const payload = del(addedPrinters, printerID);
    onUpdateAddedPrinters(payload);
    ShowConfirmNotif({
      title: "Success",
      message: `Successfully remove ${printerName}.`,
      type: "success",
    });
  };

  onRemovePrinter = async () => {
    this.onCloseConfirmOwnerPinModal();
    const { printerInfo = {}, printerID } = this.state;
    const { printerName = "" } = printerInfo;
    const { context = {} } = this.props;
    const { addedPrinters = [], shopID } = context;
    try {
      const { Merchants } = Services;
      const { RemoveMobileAppPrinter } = Merchants.PostRequests;
      const { success } = await RemoveMobileAppPrinter({ printerID, shopID });
      success
        ? this.onHandleSuccess({
            addedPrinters,
            printerID,
            printerInfo,
          })
        : this.onShowWarning(
            `Failed to remove ${printerName}. Please try again.`,
          );
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          message: "Error in Settings.onRemovePrinter",
          printerID,
          printerInfo,
        },
      });
      this.onShowWarning(`Failed to remove ${printerName}. Please try again.`);
    }
  };

  onCapture = ({ uri, type }) => {
    this.setState({
      receiptSources: {
        [type]: { uri },
        ...this.state.receiptSources,
      },
    });
  };
  constructTextReceipt = () => {
    const { context } = this.props;
    let { orderInfo } = context;
    // let { context, orderID, orderInfo } = this.props;
    const { orderID, shopTimeZone } = orderInfo;
    orderInfo = { ...orderInfo, orderID };
    // const { shopBasicInfo } = context;
    const { _generateReceipt } = Functions;
    // const { timeZone } = shopBasicInfo;
    const { headerContent, itemsContent } = _generateReceipt({
      orderInfo: { ...orderInfo, shopTimeZone },
    });
    return this.renderTextReceipt(headerContent, itemsContent);
  };
  onPrintTestOrder = async ({
    connectType,
    ipAddress,
    macAddress,
    printerBrand,
    printerName,
    printerModel,
    updatePrinterInfo = false,
  }) => {
    // this.setState({ isPrinting: true });
    const { context = {} } = this.props;
    const { BleManager } = context;
    const { OrdersManagement } = Functions;
    const { _printOrder } = OrdersManagement;
    const { receiptSources = {} } = this.state;
    const printerInfo = { connectType, ipAddress, macAddress, printerModel };
    return Promise.resolve().then(v => {
      return _printOrder({
        printerName,
        printerInfo,
        printerBrand,
        orderID: "Test Printer 123",
        BleManager,
        receiptSources:
          printerBrand === "epson" || printerBrand === "others"
            ? this.constructTextReceipt()
            : receiptSources,
        updatePrinterInfo,
      });
    });
    // .then(() => this.setState({ isPrinting: false }));
  };
  renderTextReceipt = (headerContent, itemsContent) => {
    const [
      shopName,
      orderType,
      tableOrPickupInfo,
      orderNumber,
      orderTime,
      customerName,
      itemCount,
    ] = headerContent;
    const getCenteredText = (text, lineWidth = 40) => {
      const padding = Math.max(0, Math.floor((lineWidth - text.length) / 2));
      return " ".repeat(padding) + text;
    };
    const getCenteredorderType = (text, lineWidth = 40) => {
      const padding = Math.max(0, Math.floor((lineWidth - text.length) / 2));
      return " ".repeat(padding) + text;
    };
    const header =
      `${getCenteredText(shopName)}\n` +
      `${getCenteredorderType(orderType + " " + tableOrPickupInfo)}\n\n` +
      `Order#: ${orderNumber}\n` +
      `Order Time: ${orderTime}\n` +
      `Customer Name: ${customerName}\n` +
      `Item Count: ${itemCount}\n` +
      `\n`;

    const items = itemsContent
      .map(item => {
        const {
          quantity = "",
          itemName = "",
          price = "",
          additions = "",
          guestNote = "",
        } = item;

        const { additionsDetail = "", additionsPrice = [] } = additions || {};
        const totalAdditionsPrice = additionsPrice.reduce(
          (sum, value) => sum + value,
          0,
        );

        const basePrice = Number(price.replace("$", "")) || 0;
        const total = (
          (basePrice + totalAdditionsPrice) *
          Number(quantity)
        ).toFixed(2);

        return (
          `------------------------------------------\n` +
          `(${quantity}x) ${itemName.toUpperCase()}\n` +
          (additionsDetail ? `* Additions: ${additionsDetail}\n` : "") +
          `* Price: $${total}\n` +
          (guestNote ? `* Guest Note: ${guestNote}\n` : "") +
          `\n`
        );
      })
      .join("");

    const footer = "\n".repeat(5); // feed giấy

    return header + items + footer;
  };
  SETTING_SECTIONS = {
    orderAlert: {
      title: "New Order Alert Active",
    },
    autoAcceptOrders: {
      title: "Auto-Accept Orders",
    },
    Printers: {
      title: "Printers",
    },
  };

  onRefresh = async () => {
    const { context } = this.props;
    const { onGetMobileAppActivePrinters } = context;
    this.setState({ isRefreshing: true });
    await onGetMobileAppActivePrinters();
    this.setState({ isRefreshing: false });
  };
  renderTestAlarm = () => {
    const {
      isPlayingOrderAudio = false,
      playOrderAudio,
      stopOrderAudio,
    } = this.props.context;
    return (
      <InfoCard
        cardConfig={this.SETTING_SECTIONS["orderAlert"]}
        useCustomContent={true}
        titleStyle={{ fontSize: 22 }}>
        <View style={Style.description_containter}>
          <Text style={Style.settingDesc}>
            The alarm will notify your staff when new orders arrives. You can
            test the alarm sound by tapping on the Test Alarm button.
          </Text>
          <View style={Style.printerBtnContainer}>
            {!isPlayingOrderAudio ? (
              <Button
                mode="contained"
                style={[Style.testBtn]}
                labelStyle={Style.btnLabel}
                onPress={playOrderAudio}>
                Test Alarm
              </Button>
            ) : (
              <Button
                mode="contained"
                style={[Style.testBtn, Style.stop]}
                labelStyle={Style.btnLabel}
                onPress={stopOrderAudio}>
                Stop Test
              </Button>
            )}
          </View>
        </View>
      </InfoCard>
    );
  };
  renderAutoAccept = () => {
    const { auto_accept_new_order, setAutoAccept } = this.props.context;
    return (
      <InfoCard
        cardConfig={this.SETTING_SECTIONS["autoAcceptOrders"]}
        useCustomContent={true}
        titleStyle={{ fontSize: 22 }}>
        <View style={Style.description_containter}>
          <Text style={Style.settingDesc}>
            Toggle this option to enable auto-accept orders. Once enabled, new
            orders will be accepted automatically.
          </Text>
          <View style={Style.switchRow}>
            <Text style={[Style.switchLabel]}>Off</Text>
            <Switch
              color={colors.primary}
              value={auto_accept_new_order}
              onValueChange={setAutoAccept}
            />
            <Text
              style={[
                Style.switchLabel,
                auto_accept_new_order && Style.activeSwitchLabel,
              ]}>
              On
            </Text>
          </View>
        </View>
      </InfoCard>
    );
  };
  onTogglePrinterActive = async ({ printerID, printerInfo }) => {
    try {
      const { context } = this.props;
      const { shopID, onGetMobileAppActivePrinters } = context;
      const { Merchants } = Services;
      const { ShowConfirmNotif } = Functions;

      const { ChangePrinterInfoMobile } = Merchants.PostRequests;
      const currentActive = printerInfo.is_active ?? true;
      const newPrinterInfo = {
        ...printerInfo,
        is_active: !currentActive,
      };

      const success = await ChangePrinterInfoMobile({
        printerID,
        printerInfo: newPrinterInfo,
        shopID,
      });

      if (success) {
        await onGetMobileAppActivePrinters();
        ShowConfirmNotif({
          title: "Success",
          message: `Successfully Updated `,
          type: "success",
        });
      } else {
        ShowConfirmNotif({
          title: "Error",
          message: `Could not update printer status.`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Toggle active error", error);
    }
  };

  renderPrinters = () => {
    const { context } = this.props;
    const { addedPrinters } = context;

    return (
      <View style={Style.addedPrintersContainer}>
        {Object.keys(addedPrinters).map(printerID => {
          const {
            printerBrand,
            connectType,
            printerName = "",
          } = addedPrinters[printerID];
          const printerInfo = addedPrinters[printerID];
          const { is_active = true } = printerInfo;
          const isLan = connectType === "lan";

          return (
            <View style={Style.printerContent} key={printerID}>
              <MaterialComIcon
                name="printer"
                size={responsiveWidth(4.5)}
                color={colors.success}
                style={{ marginHorizontal: responsiveWidth(2) }}
              />
              <View style={{ width: "75%" }}>
                <Text style={Style.printerName}>{printerName}</Text>
                <View style={Style.printerInfoContent}>
                  <Text style={Style.printerInfo}>
                    <MaterialComIcon
                      name={isLan ? "transit-connection-variant" : "bluetooth"}
                      size={responsiveWidth(1.8)}
                      color={colors.black}
                    />{" "}
                    {isLan ? "LAN" : "Bluetooth"}
                  </Text>
                  {printerBrand === "others" ? (
                    <Text style={Style.printerInfo}>Other Brand</Text>
                  ) : (
                    <Image
                      source={
                        printerBrand === "star"
                          ? StarPrinterLogo
                          : EpsonPrinterLogo
                      }
                      style={Style.printerLogo}
                    />
                  )}
                </View>

                <View style={Style.ultiBtnContainer}>
                  <Button
                    mode="contained"
                    style={[Style.editBtn, { borderColor: colors.info }]}
                    labelStyle={Style.editBtnLabel}
                    icon={({ color, size }) => (
                      <MaterialComIcon
                        name="pencil"
                        size={responsiveWidth(1.7)}
                        color={color}
                      />
                    )}
                    color={colors.info}
                    onPress={() =>
                      this.onOpenEditModal({ printerInfo, printerID })
                    }>
                    Edit
                  </Button>
                  <Button
                    mode={this.state.isPrinting ? "outlined" : "contained"}
                    labelStyle={Style.editBtnLabel}
                    style={[Style.editBtn, { borderColor: colors.primary }]}
                    icon={({ color, size }) => (
                      <MaterialComIcon
                        name="printer-check"
                        size={responsiveWidth(1.7)}
                        color={color}
                      />
                    )}
                    loading={this.state.isPrinting}
                    disabled={this.state.isPrinting}
                    color={colors.primary}
                    onPress={() => this.onPrintTestOrder(printerInfo)}>
                    {this.state.isPrinting ? "Printing" : "Print"}
                  </Button>
                </View>
                <View style={Style.switchRowPrinter}>
                  <Text style={[Style.switchLabel]}>Inactive</Text>
                  <Switch
                    color={colors.primary}
                    value={is_active}
                    onValueChange={() =>
                      this.onTogglePrinterActive({ printerID, printerInfo })
                    }
                  />
                  <Text
                    style={[
                      Style.switchLabel,
                      is_active && Style.activeSwitchLabel,
                    ]}>
                    Active
                  </Text>
                </View>
              </View>

              <IconButton
                mode="contained"
                size={responsiveWidth(3)}
                icon={"delete-forever"}
                color={"#ab0802"}
                onPress={() =>
                  this.onOpenConfirmOwnerPinModal({
                    printerInfo,
                    printerID,
                  })
                }
                style={[Style.removeBtn]}
              />
            </View>
          );
        })}
      </View>
    );
  };

  renderNoPrinter = () => (
    <View style={[Style.noPrinter]}>
      <MaterialComIcon
        name="printer-off"
        size={responsiveWidth(3.5)}
        style={Style.printerOff}
      />
      <Title style={{ fontSize: responsiveFontSize(1.2) }}>
        No Added Printers
      </Title>
    </View>
  );
  renderAddedPrinters = () => {
    const { context } = this.props;
    const { addedPrinters } = context;
    return (
      <InfoCard
        cardConfig={this.SETTING_SECTIONS["Printers"]}
        useCustomContent={true}
        titleStyle={{ fontSize: 22 }}>
        <View>
          <View style={Style.printerBtnHeader}>
            <Button
              mode="outlined"
              icon="refresh"
              style={Style.printerBtnRefresh}
              labelStyle={Style.btnLabel}
              loading={this.state.isRefreshing}
              onPress={this.onRefresh}>
              Refresh
            </Button>
            <Button
              mode="contained"
              icon="plus"
              style={Style.printerBtn}
              labelStyle={Style.btnLabel}
              onPress={this.onOpenRegisterModal}>
              Add Printer
            </Button>
          </View>

          {Object.keys(addedPrinters).length > 0
            ? this.renderPrinters()
            : this.renderNoPrinter()}
        </View>
      </InfoCard>
    );
  };

  render() {
    const { context } = this.props;
    const {
      addedPrinters,
      onAddMobileAppPrinter,
      onUpdateAddedPrinters,
      blePrinters,
      shopID,
      orderInfo,
    } = context;
    const { printerBrand = "" } = this.state.printerInfo;
    const { printerInfo, printerID } = this.state;

    return (
      <ScrollView
        style={Style.container}
        //contentContainerStyle={{ padding: 20 }}
      >
        {this.renderTestAlarm()}
        {this.renderAutoAccept()}
        {this.renderAddedPrinters()}
        <Orders.Receipt
          orderInfo={orderInfo}
          onCapture={this.onCapture}
          type={"star"}
        />
        {/* <Orders.Receipt
          orderInfo={orderInfo}
          onCapture={this.onCapture}
          type={"epson"}
        /> */}
        {this.state.openRegisterModal && (
          <Modals.RegisterPrinterModal
            addedPrinters={addedPrinters}
            onAddMobileAppPrinter={onAddMobileAppPrinter}
            onUpdateAddedPrinters={onUpdateAddedPrinters}
            onCloseModal={this.onCloseRegisterModal}
            blePrinterList={blePrinters}
            printTest={this.onPrintTestOrder}
          />
        )}
        {this.state.openEditModal && (
          <Modals.EditPrinterModal
            addedPrinters={addedPrinters}
            onAddMobileAppPrinter={onAddMobileAppPrinter}
            onUpdateAddedPrinters={onUpdateAddedPrinters}
            printerInfo={this.state.printerInfo}
            printerBrand={printerBrand}
            printerID={this.state.printerID}
            shopID={shopID}
            onCloseModal={this.onCloseEditModal}
            printTest={this.onPrintTestOrder}
            editing={this.state.editing}
            onOpenConfirmOwnerPinModal={this.onOpenConfirmOwnerPinModal}
            onCloseConfirmOwnerPinModal={this.onCloseConfirmOwnerPinModal}
            onOpenSelectPortModal={this.onOpenSelectPortModal}
            onCloseSelectPortModal={this.onCloseSelectPortModal}
            onRef={ref => (this.child = ref)}
          />
        )}
        {this.state.openConfirmPinModal && (
          <Modals.ConfirmOwnerPinModal
            onCloseModal={this.onCloseConfirmOwnerPinModal}
            onCallback={
              this.state.editing
                ? this.child.onChangePrinterInfo
                : this.onRemovePrinter
            }
            shopID={shopID}
          />
        )}
        {this.state.openSelectPortModal && (
          <Modals.SelectPortModal
            onCloseModal={this.onCloseSelectPortModal}
            onCallback={
              this.state.editing
                ? this.child.onChangePrinterInfo
                : this.onRemovePrinter
            }
            shopID={shopID}
          />
        )}
      </ScrollView>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(Settings);
