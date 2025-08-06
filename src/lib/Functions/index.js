// BUTI DINERS, INC. All right Reserved ©

import React from "react";
import { Linking } from "react-native";
import Toast from "react-native-toast-message";
import DateTime from "./DateTime";
import FoodMenuFuncs from "./FoodMenuFuncs";
import InfoSanitizer from "./InfoSanitizer";
import LocalStorage from "./LocalStorage";
import Math from "./Math";
import OrderMathFuncs from "./OrderMathFuncs";
import OrdersManagement from "./OrdersManagement";
import { set } from "object-path-immutable";
import { Constants } from "lib";
import { View, Text, TouchableOpacity } from "react-native";

import { _generateReceipt } from "./ReceiptContent";
import {
  _initBlePrinter,
  _initLanPrinter,
  _getBlePrinters,
  _onPrintWithEpson,
  _onPrintWithStar,
} from "./Printer";

// Lib
import { Services } from "lib";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Notifier, NotifierComponents } from "react-native-notifier";

// -------------------------------------------------------------------
// Send a single text message to multiple numbers
const SendSingleTextMessageToMultipleNumbers = async params => {
  const { BUTI } = Services;
  const { SendTextMessage } = BUTI.PostRequests;
  const { body, phoneNumbers } = params;
  await Object.values(phoneNumbers).forEach(
    async number =>
      number && (await SendTextMessage({ body: body || "", to: number })),
  );
};

// -------------------------------------------------------------------
// Returns a pill notification that would appear at the top
// of the page
const defaultProps = {
  displayType: "warning",
  disableTrallingIcon: false,
  disableLeadingIconPress: false,
};
const ShowConfirmNotif = ({
  title,
  message,
  type,
  props = defaultProps,
  options,
}) => {
  Toast.show({
    type: type || "info", //'success | error | info',
    position: "top",
    text1: title,
    text2: message,
    visibilityTime: 1800,
    autoHide: true,
    topOffset: responsiveHeight(2.5),
    props: { ...defaultProps, ...props },
    ...options,
    onPress: () => Toast.hide(),
  });
};
const CustomAlert = ({ alertType, title, description, button }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#000",
        borderRadius: 4,
        minWidth: 400,
      }}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        {/* <Text style={{ fontWeight: "bold", color: "#fff" }}>{title}</Text> */}
        <Text style={{ color: "#fff", marginTop: 4 }}>{description}</Text>
      </View>
      <View>{button}</View>
    </View>
  );
};
const ShowConfirmNotifBottom = ({
  title,
  message,
  type = "success",
  props = {},
  options = {},
  button = null, 
}) => {
  Notifier.showNotification({
    title,
    description: message,
    duration: options.autoHide === false ? 0 : options.visibilityTime ?? 1800,
    Component: CustomAlert,
    componentProps: {
      alertType: type,
      title,
      description: message,
      button,
      ...props,
    },
    containerStyle: {
      bottom: 30,
      top: undefined,
      position: "absolute",
      width: 600,
      left: "30%",
    },
  });
};

const HideConfirmNotif = () => {
  Toast.hide();
};

const HelpActions = (contactType = "") => {
  const { REGEX } = Constants;
  if (contactType.match(REGEX.US_PHONE_NUMBER)) {
    Linking.openURL("tel:+16789996082");
  } else if (contactType.match(REGEX.EMAIL)) {
    Linking.openURL("mailto:accounts@skiplinow.com");
  }
};
const PhonecallAction = (phoneNumber = "") => {
  const { REGEX } = Constants;
  if (phoneNumber.match(REGEX.US_PHONE_NUMBER)) {
    Linking.openURL(`tel:+1${phoneNumber}`);
  }
};
const _checkAddedPrinters = addedPrinters => {
  return Object.values(addedPrinters).reduce(
    (result, printer) => {
      const { printerBrand } = printer;
      if (printerBrand === "star") {
        result = set(result, "isStarAdded", true);
      }
      if (["epson", "others"].includes(printerBrand)) {
        result = set(result, "isEpsonAdded", true);
      }
      return result;
    },
    {
      isEpsonAdded: false,
      isStarAdded: false,
    },
  );
};
export default {
  DateTime,
  InfoSanitizer,
  FoodMenuFuncs,
  LocalStorage,
  Math,
  OrderMathFuncs,
  OrdersManagement,
  SendSingleTextMessageToMultipleNumbers,
  ShowConfirmNotif,
  ShowConfirmNotifBottom,
  HideConfirmNotif,
  HelpActions,
  PhonecallAction,
  _generateReceipt,
  _initBlePrinter,
  _initLanPrinter,
  _getBlePrinters,
  _onPrintWithEpson,
  _onPrintWithStar,
  _checkAddedPrinters,
};
