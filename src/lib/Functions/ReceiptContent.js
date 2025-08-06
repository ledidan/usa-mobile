import { PixelRatio } from "react-native";
// Utils
import { _roundNumber } from "utils";
// Lib
import { Constants, Functions } from "lib";
import DateTime from "./DateTime";
const { _convertUTCTimestampToLocalTime } = DateTime;

const { ORDER_DELIVERY_TYPES } = Constants;

const _generateReceipt = ({ orderInfo }) => {
  const headerContent = _createHeader(orderInfo);
  const itemsContent = _createOrderItems(orderInfo);
  //Each item is an object contains 5 elements: {quantity, itemName ,price ,addtions ,guestNode}
  return { headerContent, itemsContent };
};

const _createHeader = orderInfo => {
  const {
    customerName,
    orderItems = {},
    deliveryDetails = {},
    pickUpTime = "",
    orderDeliveryTypeID = "inStore",
    tableNumber = "",
    orderID,
    timeStamp,
    shopTimeZone,
  } = orderInfo;
  const { local_date, local_time } = _convertUTCTimestampToLocalTime({
    localTimeZone: shopTimeZone,
    timeStamp,
  });

  const { OrderMathFuncs } = Functions;
  const { _calcTotalItemsCount } = OrderMathFuncs;
  const itemsCount = _calcTotalItemsCount({ orderItems });
  const { courier } = deliveryDetails;
  const { label = "" } = ORDER_DELIVERY_TYPES[orderDeliveryTypeID] || "";
  let text = "";
  if (orderDeliveryTypeID === "inStore") text = `, Table: ${tableNumber}`;
  else if (orderDeliveryTypeID === "pickUp") text = `, ${pickUpTime}`;
  const content = [
    "SKIPLI",
    `${label}${text}`,
    orderDeliveryTypeID === "deliver" ? `Courier: ${courier}\n` : " ",
    `${orderID}`,
    `${local_date} - ${local_time}`,
    `${customerName}`,
    `${itemsCount} item${itemsCount === 1 ? "" : "s"}`,
  ];
  return content;
};

const _createOrderItems = ({ orderItems }) => {
  let items = Object.values(orderItems).reduce((result, details) => {
    const {
      customerInstruction,
      itemSimpleDescription,
      modifierGroups = {},
      quantity,
      itemIsOnSale = false,
      itemSaleRate = 0,
    } = details;
    const {
      itemKitchenChitName = "",
      itemName,
      itemPrice,
    } = itemSimpleDescription;
    let additions = _createModifiers({ modifierGroups });
    let guestNote = _createInstruction({ customerInstruction });
    let item = {
      quantity: `${quantity}`,
      itemName: ` ${itemKitchenChitName || itemName}`,
      price: `$${itemPrice}`,
      additions,
      guestNote,
      itemIsOnSale,
      itemSaleRate,
    };

    result.push(item);
    return result;
  }, []);
  return items;
};
const _createModifiers = ({ modifierGroups = {} }) => {
  if (Object.keys(modifierGroups).length === 0) return "";
  let allModifiers = [];
  let additionsPrice = [];
  Object.values(modifierGroups).forEach(modifierGroupInfo => {
    const { modifiers } = modifierGroupInfo;
    Object.values(modifiers).forEach(modifierInfo => {
      const {
        modifierKitchenChitName = "",
        modifierName,
        modifierPrice = 0,
      } = modifierInfo;
      additionsPrice = additionsPrice.concat(modifierPrice);
      allModifiers = allModifiers.concat(
        `${modifierKitchenChitName || modifierName} ($${modifierPrice})`,
      );
    });
  });
  return { additionsDetail: `${allModifiers.join(", ")}`, additionsPrice };
};
const _createInstruction = ({ customerInstruction = "" }) => {
  if (!customerInstruction) return "";
  customerInstruction = customerInstruction.replace(/(\r?\n|\r)/gm, ". ");
  return `${customerInstruction}`;
};
export { _generateReceipt };
