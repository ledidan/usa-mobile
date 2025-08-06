import _get from "lodash.get";

//Util
import { _formatPhoneNumber } from "utils";

// ------------------------------------------
// Create confirm message for customer after the order is accepted
const _createConfirmMsgForCustomer = ({
  customerName,
  deliveryDetails = {},
  preparationTime,
  shopBasicInfo,
}) => {
  const { name: shopName, phoneNumber = "" } = shopBasicInfo;
  const shopNumberText = !phoneNumber
    ? ""
    : ` Call ${_formatPhoneNumber(phoneNumber)} if you have any questions.`;
  const estimateTime =
    preparationTime === "Other"
      ? ""
      : `Your order will be ready in ${preparationTime}.`;
  return `Hi ${customerName}, ${shopName} confirmed your order! ${estimateTime}${shopNumberText}`;
};

// ------------------------------------------
// Create a text for customer when the order is ready
const _createOrderReadyMsgForCustomer = ({ orderDeliveryTypeID, shopName }) => {
  const message =
    orderDeliveryTypeID === "deliver"
      ? `Your order @${shopName} is on the way!`
      : `Your order @${shopName} is almost ready!`;
  return `${message} Ignore this msg if you received your order.`;
};

export { _createConfirmMsgForCustomer, _createOrderReadyMsgForCustomer };
