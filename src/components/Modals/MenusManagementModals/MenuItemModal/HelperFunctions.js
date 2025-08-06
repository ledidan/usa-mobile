// BUTI DINERS, INC. All right Reserved ©

import * as immutable from "object-path-immutable";

import { _roundNumber } from "utils";

// Lib
import { Constants } from "lib";

const _getSubmitBtnStatus = ({ inputErrors = {}, itemInfo = {} }) => {
  const { itemPrice } = itemInfo;
  if (Object.keys(inputErrors).length > 0) return "inactive";
  else if (itemPrice && isNaN(itemPrice)) return "inactive";
  const { NEW_ITEM_FIELDS } = Constants;
  const shouldEnableCreateBtn = NEW_ITEM_FIELDS.reduce((result, field) => {
    const { id, required } = field;
    const isRequiredFieldValueValid = itemInfo[id] || false;
    return result && (required ? isRequiredFieldValueValid : true);
  }, true);
  return shouldEnableCreateBtn ? "active" : "inactive";
};

// const _validateInputValue = ({ inputErrors = {}, fieldID, value }) => {
//   switch (fieldID) {
//     case "itemPrice":
//       return isNaN(value)
//         ? immutable.set(inputErrors, "itemPrice", "Price is invalid")
//         : immutable.del(inputErrors, "itemPrice");
//     default:
//       return inputErrors;
//   }
// };

const _vetItemInfoBeforeSubmit = ({ itemInfo }) => {
  const { itemPrice } = itemInfo;
  return !itemPrice
    ? itemInfo
    : immutable.set(itemInfo, "itemPrice", parseFloat(_roundNumber(itemPrice)));
};

const _createEmailContent = ({
  personnel,
  shopBasicInfo,
  optionID,
  itemName,
}) => {
  const { personnelID = "", personnelName = "" } = personnel;
  const { id = "", name = "" } = shopBasicInfo;
  const subject = `${name} has update their Menu Items`;
  const body = `Restaurant Name: ${name}.\n\tID: ${id}.\n\t${personnelName} (Id: ${personnelID}) has updated the following item.\n\t\t- Item name: \"${itemName}"\.\n\t\t- Out of stock: ${
    optionID === "true" ? "Yes" : "No"
  }`;
  return { subject, body };
};

export { _getSubmitBtnStatus, _vetItemInfoBeforeSubmit, _createEmailContent };
