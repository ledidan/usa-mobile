// BUTI DINERS, INC. All right Reserved ©

import React from "react";
import { View, Text } from "react-native";
import { set } from "object-path-immutable";
import _pick from "lodash.pick";

import Modifiers from "components/CartItem/Modifiers";

// Utils
import { _formatPhoneNumber } from "utils";

//Field
import { Strong } from "fields";

// Style
import Style from "./style";

// Lib
import { Functions } from "lib";

const REFUND_REASONS = {
  missingItem: { label: "Missing item(s)" },
  outOfStock: { label: "Out of stock" },
  kitchenClosed: { label: "Kitchen closed" },
  paidAtCounter: { label: "Paid at counter" },
  other: { label: "Other" },
};

const REFUND_TYPES = {
  selectItems: { label: "Select Items" },
  customAmount: { label: "Custom Amount" },
  allItems: { label: "All Items" },
};

const _calculateRefundAmount = ({
  orderItems = {},
  selectedOrderItems = [],
}) => {
  const { OrderMathFuncs } = Functions;
  const { _calSubTotalOfOrder } = OrderMathFuncs;
  return _calSubTotalOfOrder({
    orderItems: _pick(orderItems, selectedOrderItems),
  });
};

const _convertItemsToCheckboxOptions = ({ items }) => {
  const { OrderMathFuncs } = Functions;
  const { _calcTotalPriceBeforeTaxForItem } = OrderMathFuncs;
  return Object.keys(items).reduce((result, itemId) => {
    const {
      itemSimpleDescription = {},
      quantity = 1,
      modifierGroups = {},
    } = items[itemId];
    const { itemKitchenChitName = "", itemName } = itemSimpleDescription;
    const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItem({
      detailsOfItemInCart: items[itemId],
    });
    return set(result, itemId, {
      description: <Modifiers modifierGroups={modifierGroups} />,
      label: (
        <View style={Style.checkboxOptionLabel}>
          <Strong style={Style.itemName}>
            ({quantity}x) {itemKitchenChitName || itemName}
          </Strong>
          <Strong>${totalPriceBeforeTax.toFixed(2)}</Strong>
        </View>
      ),
    });
  }, {});
};

const _createEmailRequestToSkipli = ({
  orderId = "",
  orderInfo = {},
  personnel = {},
  refundAmount = 0,
  refund_request_id = "",
  reason = {},
  shopBasicInfo = {},
  shopID,
}) => {
  const {
    customerName,
    phoneNumber,
    paymentIntentID,
    timeStamp,
    totalPriceAfterTax,
    uuid,
  } = orderInfo;
  const { DateTime } = Functions;
  const { _convertUTCTimestampToLocalTime } = DateTime;
  const { personnelName } = personnel;
  const { name: shopName, timeZone } = shopBasicInfo;
  const stripe_payment_link = `https://dashboard.stripe.com/payments/${paymentIntentID}`;
  const merchant_dashboard_link = `https://admin.skiplinow.com/${shopID}`;

  const { local_date, local_time } = _convertUTCTimestampToLocalTime({
    localTimeZone: timeZone,
    timeStamp,
  });

  const email_body = `Hi,\r\n\r\n${personnelName} from ${shopName} requested a refund. Please see the information below:\r\n\r\n--- Refund Information ---\r\nRequested amount: $${parseFloat(
    refundAmount,
  ).toFixed(2)}\r\nReason: ${
    reason.text
  }\r\nRequest id: ${refund_request_id}\r\n\r\n--- Order Information ---\r\nId: ${orderId}\r\nTotal amount: $${parseFloat(
    totalPriceAfterTax,
  ).toFixed(
    2,
  )}\r\nReceived at: ${`${local_date} ${local_time}`}\r\nPayment intent id: ${paymentIntentID}\r\n\r\nView payment on Stripe\r\n${stripe_payment_link}\r\n\r\nView order on Merchant Dashboard\r\n${merchant_dashboard_link}\r\n\r\n--- Customer Information ---\r\nName: ${customerName}\r\nPhone: ${_formatPhoneNumber(
    phoneNumber,
  )}\r\nId: ${uuid}\r\n\r\nBest,`;
  return {
    email_body,
    email_subject: `Refund requested by ${shopName}!`,
  };
};

const _createTextMessageToGuest = ({
  customerName,
  reason = {},
  shopName,
  shopTimeZone,
  timeStamp,
}) => {
  const { DateTime } = Functions;
  const { _convertUTCTimestampToLocalTime } = DateTime;
  const { local_date } = _convertUTCTimestampToLocalTime({
    localTimeZone: shopTimeZone,
    timeStamp,
  });
  return `Hi ${customerName}, ${shopName} requested a refund for your order on ${local_date}. Reason: ${reason.text}. Refunds take 5-10 days to appear on your statement.`;
};

const _getSubmitButtonStatus = ({
  isCreatingRequest,
  reason = {},
  refundAmount,
}) => {
  if (isCreatingRequest) return "loading";
  else if (!refundAmount || parseFloat(refundAmount) === 0) return "inactive";
  const reason_text = String(reason.text || "").trim();
  if (!reason_text) return "inactive";
  return "active";
};

export {
  _calculateRefundAmount,
  _convertItemsToCheckboxOptions,
  _createEmailRequestToSkipli,
  _createTextMessageToGuest,
  _getSubmitButtonStatus,
  REFUND_REASONS,
  REFUND_TYPES,
};
