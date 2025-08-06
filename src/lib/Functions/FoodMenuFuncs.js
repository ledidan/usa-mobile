// BUTI DINERS, INC. All right Reserved ©

import { set } from "object-path-immutable";
import _orderBy from "lodash.orderby";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";
import _get from "lodash.get";

// Lib
import { Constants, Services } from "lib";

const { DEFAULT_TIMEZONE, NEW_ITEM_FIELDS, ORDER_DELIVERY_TYPES, TIME_FORMAT } =
  Constants;

// -------------------------------------------------------------------
// Get the information from the database for a list of groups using
// their IDs

const GetInformationForGroups = async ({ groups = {}, shopID = "" }) => {
  if (!shopID) return {};
  const { Merchants } = Services;
  const { GetMenuGroupInformation } = Merchants.GetRequests;
  return await Object.keys(groups).reduce(async (previousPromise, groupID) => {
    const result = await previousPromise;
    const { groupInfo } = await GetMenuGroupInformation({ groupID, shopID });
    return groupInfo ? set(result, groupID, groupInfo) : result;
  }, Promise.resolve({}));
};

// -------------------------------------------------------------------
// Get the information from the database for a list of items using
// their IDs

const GetInformationForItems = async ({ items = {}, shopID = "" }) => {
  if (!shopID) return {};
  const { Merchants } = Services;
  const { GetMenuItemInformation } = Merchants.GetRequests;
  return await Object.keys(items).reduce(async (previousPromise, itemID) => {
    const result = await previousPromise;
    const { itemInfo } = await GetMenuItemInformation({ itemID, shopID });
    return itemInfo ? set(result, itemID, itemInfo) : result;
  }, Promise.resolve({}));
};

// -------------------------------------------------------------------
// Get the information from the database for a list of modifiers using
// their IDs

const GetInformationForModifiers = async ({ modifiers = {}, shopID = "" }) => {
  if (!shopID) return {};
  const { Merchants } = Services;
  const { GetMenuModifierInformation } = Merchants.GetRequests;
  return await Object.keys(modifiers).reduce(
    async (previousPromise, modifierID) => {
      const result = await previousPromise;
      const params = { modifierID, shopID };
      const { modifierInfo } = await GetMenuModifierInformation(params);
      return modifierInfo ? set(result, modifierID, modifierInfo) : result;
    },
    Promise.resolve({}),
  );
};

// -------------------------------------------------------------------
// Get the information from the database for a list of modifier groups using
// their IDs

const GetInformationForModifierGroups = async ({
  modifierGroups = {},
  shopID = "",
}) => {
  if (!shopID) return {};
  const { Merchants } = Services;
  const { GetMenuModifierGroupInformation } = Merchants.GetRequests;
  return await Object.keys(modifierGroups).reduce(
    async (previousPromise, modifierGroupID) => {
      const result = await previousPromise;
      const params = { modifierGroupID, shopID };
      const { modifierGroupInfo } = await GetMenuModifierGroupInformation(
        params,
      );
      return modifierGroupInfo
        ? set(result, modifierGroupID, modifierGroupInfo)
        : result;
    },
    Promise.resolve({}),
  );
};

// -------------------------------------------------------------------
// Get the text description for an item so we have a written record of
// the item in case it gets deleted by the merchants

const GetTextDescriptionForOrder = ({ orderDetails = {}, timeZone }) => {
  const { orderDeliveryTypeID } = orderDetails;
  let location = ORDER_DELIVERY_TYPES[orderDeliveryTypeID].label;

  if (orderDeliveryTypeID === "inStore")
    location = location.concat(`, table: ${orderDetails.tableNumber || ""}`);
  const receivedTime = formatToTimeZone(orderDetails.timeStamp, TIME_FORMAT, {
    timeZone: timeZone || DEFAULT_TIMEZONE,
  });
  // const itemsDescription = GetTextDescriptionForOrderItems({
  //   orderItems: orderDetails.orderItems
  // });
  return `${location}, name: ${
    orderDetails.customerName
  }, time: ${receivedTime} ${!timeZone ? "EST" : ""}, total: $${
    orderDetails.totalPriceAfterTax
  }\nCheck BUTI dashboard for details.`;
};

// const GetTextDescriptionForOrderItems = ({ orderItems = {} }) =>
//   Object.values(orderItems).reduce((result, item) => {
//     const { customerInstruction, itemSimpleDescription } = item;
//     const { itemName } = itemSimpleDescription;
//     result = result.concat(`\n${item.quantity} - ${itemName}`);
//     if (customerInstruction) result = result.concat(`\n${customerInstruction}`);
//     return result;
//   }, "");

// -------------------------------------------------------------------
// Item Details

// const getSpecialPrice = (itemSpecialPrices = [], currentTimestamp) => {
//   const specialPricesApplicable = itemSpecialPrices.map(
//     ({ endTime, measure, specialPrice, startTime, startDate, units }) => {
//       // Get today's UTC date and convert it to ISO 8601 format
//       const todayDateTime = currentTimestamp.split("T");
//       const todayDate = todayDateTime[0];
//       const currentTime = todayDateTime[1];

//       // Create a recurrence rule
//       const recur = everydate({
//         start: startDate,
//         units: units,
//         measure: measure
//       });
//       // Check if today falls in the recurrence rule
//       const isTodayMatched = recur.match(todayDate);
//       // If today is not matched, return false, else check if the time matches
//       if (!isTodayMatched) return false;
//       if (startTime && currentTime < startTime) return false;
//       if (endTime && currentTime > endTime) return false;
//       return specialPrice;
//     }
//   );
//   const resultArray = specialPricesApplicable.filter(price => Boolean(price));
//   return resultArray.length > 0 ? resultArray[0] : "";
// };

const rankSectionOptions = (options = [], rankById = "") => {
  if (options.length === 0 || !rankById) {
    return options;
  }
  options.sort((a, b) => {
    const val1 = parseFloat(a[rankById]) || 0;
    const val2 = parseFloat(b[rankById]) || 0;
    return val2 - val1;
  });
  return options;
};

// -------------------------------------------------------------------
// Removed unwanted field and ensure item info quantity before submitting

const SanitizeItemInfoBeforeSubmit = (itemInfo = {}) => {
  let sanitizedItemInfo = NEW_ITEM_FIELDS.reduce(
    (result, { id }) => set(result, id, itemInfo[id] || ""),
    {},
  );
  sanitizedItemInfo.itemImages = itemInfo.itemImages || {};
  sanitizedItemInfo.itemIsArchived = itemInfo.itemIsArchived;
  sanitizedItemInfo.modifierGroups = itemInfo.modifierGroups;
  return sanitizedItemInfo;
};

// -------------------------------------------------------------------
// Sort categories by name in alphabetical order by default
// Then sort the categories by its index in list
// Return an array of sorted group IDs

const SortMenuCategories = (categories = {}) =>
  _orderBy(
    Object.keys(categories),
    [
      categoryId => categories[categoryId]["index_in_list"] || -10000000,
      categoryId => categories[categoryId]["groupName"] || "",
    ],
    ["asc", "asc"],
  );

// -------------------------------------------------------------------
// Rank items by name
// Return an array of sorted item IDs

const SortMenuItems = (items = {}) =>
  _orderBy(
    Object.keys(items),
    itemID => _get(items, `${itemID}.itemName`) || "",
    ["asc"],
  );

export default {
  GetInformationForGroups,
  GetInformationForItems,
  GetInformationForModifiers,
  GetInformationForModifierGroups,
  GetTextDescriptionForOrder,
  rankSectionOptions,
  SanitizeItemInfoBeforeSubmit,
  SortMenuCategories,
  SortMenuItems,
};
