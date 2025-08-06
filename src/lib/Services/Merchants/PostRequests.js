// BUTI DINERS, INC. All right Reserved ©

import API_PATHS from "../API_Paths";
import axios from "axios";

// Lib
import { Functions } from "lib";
import InfoSanitizer from "lib/Functions/InfoSanitizer";

const { ADD_ITEM_TO_GROUP, CREATE_NEW_MENU_GROUP, CREATE_NEW_MENU } = API_PATHS;

const { FoodMenuFuncs } = Functions;
const { SanitizeItemInfoBeforeSubmit } = FoodMenuFuncs;

// -----------------------------------------------------------------------
// Add a group to a menu

const AddGroupToMenu = ({ groupID, menuID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || !menuID || !shopID)
      return reject("(AddGroupToMenu) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ADD_GROUP_TO_MENU, { groupID, menuID, shopID })
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Add an item to a group

const AddItemToGroup = ({ groupID, itemID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || !itemID || !shopID)
      return reject("(AddItemToGroup) Parameters are not sufficient.");
    axios
      .post(ADD_ITEM_TO_GROUP, { groupID, itemID, shopID })
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Add an item to a group modifier

const AddItemToGroupModifier = params =>
  new Promise((resolve, reject) => {
    if (!params.itemID || !params.modifierID || !params.shopID)
      return reject("(AddItemToGroupModifier) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ADD_ITEM_TO_GROUP_MODIFIER, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Add a modifier to a group

const AddModifierToGroup = params =>
  new Promise((resolve, reject) => {
    if (!params.groupID || !params.modifierID || !params.shopID)
      return reject("(AddModifierToGroup) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ADD_MODIFIER_TO_GROUP, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Add a printer to shop

const AddPrinter = params =>
  new Promise((resolve, reject) => {
    if (!params.printerInfo || !params.printerName || !params.shopID)
      return reject("(AddPrinter) Parameters are not sufficient");
    axios
      .post(API_PATHS.ADD_PRINTER, params)
      .then(() => resolve({ success: true }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Add a printer to shop

const AddMobileAppPrinter = params =>
  new Promise((resolve, reject) => {
    if (!params.printerInfo || !params.shopID || !params.printerID)
      return reject("(AddMobileAppPrinter) Parameters are not sufficient");
    axios
      .post(API_PATHS.ADD_MOBILE_APP_PRINTER, params)
      .then(() => resolve({ success: true }))
      .catch(err => reject(err));
  });

// -----------------------------------------------------------------------
// Archive a menu item

const ArchiveItem = ({ itemID, shouldArchiveItem = true, shopID }) =>
  new Promise((resolve, reject) => {
    if (!itemID || !shopID)
      return reject("(ArchiveItem) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ARCHIVE_ITEM, { itemID, shouldArchiveItem, shopID })
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Archive a menu category

const ArchiveMenuGroup = params =>
  new Promise((resolve, reject) => {
    if (!params.groupID || !params.shopID)
      return reject("(ArchiveMenuGroup) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ARCHIVE_MENU_GROUP, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Archive a modifier group

const ArchiveModifierGroup = params =>
  new Promise((resolve, reject) => {
    if (!params.modifierGroupID || !params.shopID)
      return reject("(ArchiveModifierGroup) Parameters are not sufficient.");
    axios
      .post(API_PATHS.ARCHIVE_MODIFIER_GROUP, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Change the printer brand
const ChangePrinterBrand = params =>
  new Promise((resolve, reject) => {
    if (!params.printerBrand || !params.printerName || !params.shopID)
      return reject("(ChangePrinterBrand) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_PRINTER_BRAND, params)
      .then(() => resolve({ success: true }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// [MOBILE] Change the printer brand
const ChangePrinterInfoMobile = params => {
  return new Promise((resolve, reject) => {
    if (!params.printerInfo || !params.printerID || !params.shopID)
      return reject("(ChangePrinterInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_PRINTER_BRAND_MOBILE, params)
      .then(() => resolve({ success: true }))
      .catch(reject);
  });
};

// -----------------------------------------------------------------------
// Change the status of an active order

const ChangeStatusOfActiveOrder = params =>
  new Promise((resolve, reject) => {
    const { nextStatus, orderID, shopID } = params;
    if (!["active", "confirmed"].includes(nextStatus) || !orderID || !shopID)
      return reject(
        "(ChangeStatusOfActiveOrder) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.CHANGE_STATUS_OF_ACTIVE_ORDER, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Create a coupon

const CreateCoupon = params =>
  new Promise((resolve, reject) => {
    const { shopID, coupon } = params;
    const { name, selections, couponType } = coupon;
    if (!name || !shopID || !selections || !couponType) {
      return reject("(CreateCoupon) Parameters are not sufficient.");
    }
    axios
      .post(API_PATHS.CREATE_COUPON, params)
      .then(({ data }) => resolve({ newCouponID: data }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Create a new menu group

const CreateNewMenuGroup = ({ groupInfo, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupInfo || !shopID)
      return reject("(CreateNewMenuGroup) Parameters are not sufficient.");
    const params = { groupInfo, shopID };
    axios
      .post(CREATE_NEW_MENU_GROUP, params)
      .then(({ data }) => resolve({ groupID: data }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Create a new menu

const CreateNewMenu = ({ menuInfo, shopID }) =>
  new Promise((resolve, reject) => {
    if (!menuInfo || !shopID)
      return reject("(CreateNewMenu) Parameters are not sufficient.");
    const params = { menuInfo, shopID };
    axios
      .post(CREATE_NEW_MENU, params)
      .then(({ data }) => resolve({ menuID: data }))
      .catch(reject);
  });

const CreateNewModifier = params =>
  new Promise((resolve, reject) => {
    if (Object.keys(params.modifierInfo).length === 0 || !params.shopID)
      return reject("(CreateNewModifier) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_NEW_MODIFIER, params)
      .then(({ data }) => resolve({ modifierID: data }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Create a new group modifier

const CreateNewModifierGroup = ({ modifierGroupInfo, shopID }) =>
  new Promise((resolve, reject) => {
    if (Object.keys(modifierGroupInfo).length === 0 || !shopID)
      return reject("(CreateNewModifierGroup) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_NEW_MODIFIER_GROUP, { modifierGroupInfo, shopID })
      .then(({ data }) => resolve({ modifierGroupID: data }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Create a new shop personnel
const CreateNewShopPersonnel = params => {
  const { personnelInfo = {}, personnelPin, shopID } = params;
  return new Promise((resolve, reject) => {
    if (Object.keys(personnelInfo).length === 0 || !personnelPin || !shopID)
      return reject("(CreateNewShopPersonnel) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_NEW_SHOP_PERSONNEL, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });
};

// -----------------------------------------------------------------------
// Create a new parseur mailbox to receive orders from third-parties
const CreateParseurMailbox = params =>
  new Promise((resolve, reject) => {
    if (!params.mailbox_prefix || !params.shopID)
      return reject("(CreateParseurMailbox) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_PARSEUR_MAILBOX, params)
      .then(({ data }) => resolve({ mailbox: data }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Create a refund request for a past order
const CreateRefundRequest = params =>
  new Promise((resolve, reject) => {
    if (
      !params.refund_request_id ||
      !params.request_details ||
      !params.orderId ||
      !params.shopId
    )
      return reject("(CreateRefundRequest) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CREATE_REFUND_REQUEST, params)
      .then(({ data }) => resolve({ createdAt: data.createdAt || "" }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Delete a menu

const DeleteMenu = ({ menuID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!menuID || !shopID)
      return reject("(DeleteMenu) Parameters are not sufficient.");
    axios
      .post(API_PATHS.DELETE_MENU, { menuID, shopID })
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Delete a modifier

const DeleteModifier = params =>
  new Promise((resolve, reject) => {
    if (!params.modifierID || !params.shopID)
      return reject("(DeleteModifier) Parameters are not sufficient.");
    axios.post(API_PATHS.DELETE_MODIFIER, params).then(resolve).catch(reject);
  });

// ---------------------------------------------------------------
// Archive an active order

const MoveActiveOrderToPastOrders = params =>
  new Promise((resolve, reject) => {
    if (!params.orderID || !params.shopID)
      return reject(
        "(MoveActiveOrderToPastOrders) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.MOVE_ACTIVE_ORDER_TO_PAST_ORDERS, params)
      .then(() => resolve({ success: true }))
      .catch(error => resolve({ success: false, error }));
  });

// -----------------------------------------------------------------------
// Remove a coupon

const RemoveCoupon = ({ archiveCouponID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!archiveCouponID)
      return reject("(RemoveCoupon) Parameters are not sufficent");
    axios
      .post(API_PATHS.REMOVE_COUPON, { archiveCouponID, shopID })
      .then(() => resolve(true))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Remove a group from a menu

const RemoveGroupFromMenu = ({ groupID, menuID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || !menuID || !shopID)
      return reject("(RemoveGroupFromMenu) Parameters are not sufficient.");
    const params = { groupID, menuID, shopID };
    axios
      .post(API_PATHS.REMOVE_GROUP_FROM_MENU, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Remove an item from a group

const RemoveItemFromGroup = ({ groupID, itemID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || !itemID || !shopID)
      return reject("(RemoveItemFromGroup) Parameters are not sufficient.");
    const params = { groupID, itemID, shopID };
    axios
      .post(API_PATHS.REMOVE_ITEM_FROM_GROUP, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Remove an item from a group modifier
const RemoveItemFromGroupModifier = params =>
  new Promise((resolve, reject) => {
    if (!params.itemID || !params.modifierID || !params.shopID)
      return reject(
        "(RemoveItemFromGroupModifier) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.REMOVE_ITEM_FROM_GROUP_MODIFIER, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Edit Coupon
const SaveChangedCoupon = (params = {}) =>
  new Promise((resolve, reject) => {
    if (!params.couponID || !params.coupon || !params.shopID)
      return reject("(SaveChangedCoupon) Paramters are not sufficient");
    axios
      .post(API_PATHS.SAVE_CHANGED_COUPON, params)
      .then(({ data }) => {
        const { isCouponActive } = data;
        resolve({ isCouponActive });
      })
      .catch(reject);
  });

// Remove a shop personnel
const RemovePersonnel = params =>
  new Promise((resolve, reject) => {
    if (!params.personnelPin || !params.shopID)
      return reject("(RemovePersonnel) Parameters are not sufficient.");
    axios
      .post(API_PATHS.REMOVE_SHOP_PERSONNEL, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// Remove the printer
const RemovePrinter = params =>
  new Promise((resolve, reject) => {
    if (!params.printerName || !params.shopID)
      return reject("(RemovePrinter) Parameters are not sufficient.");
    axios
      .post(API_PATHS.REMOVE_PRINTER, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

//Remove Mobile App Printer
const RemoveMobileAppPrinter = params =>
  new Promise((resolve, reject) => {
    if (!params.printerID || !params.shopID)
      return reject("(RemoveMobileAppPrinter) Parameters are not sufficient.");
    axios
      .post(API_PATHS.REMOVE_MOBILE_APP_PRINTER, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

const SaveChangedDeliverInfo = params =>
  new Promise((resolve, reject) => {
    if (!params.deliverInfo || !params.shopID)
      return reject("(SaveChangedDeliverInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_DELIVER_INFO, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new info to group

const SaveChangedGroupInfo = ({ groupID, groupInfo, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || Object.keys(groupInfo).length === 0 || !shopID)
      return reject("(SaveChangedGroupInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_GROUP_INFO, { groupID, groupInfo, shopID })
      .then(() => resolve(true))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save new info to item

const SaveChangedItemInfo = ({ itemID, itemInfo, shopID }) =>
  new Promise((resolve, reject) => {
    if (!itemID || Object.keys(itemInfo).length === 0 || !shopID)
      return reject("(SaveChangedItemInfo) Parameters are not sufficient.");
    const sanitizedItemInfo = SanitizeItemInfoBeforeSubmit(itemInfo, "edit");
    const params = { itemID, itemInfo: sanitizedItemInfo, shopID };
    axios
      .post(API_PATHS.SAVE_CHANGED_ITEM_INFO, params)
      .then(() => resolve({ sanitizedItemInfo }))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save new info to menu
const SaveChangedMenuInfo = params =>
  new Promise((resolve, reject) => {
    const { menuID, menuInfo, shopID } = params;
    if (!menuID || Object.keys(menuInfo).length === 0 || !shopID)
      return reject("(SaveChangedMenuInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_MENU_INFO, params)
      .then(() => resolve(true))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save merchant get paid info
const SaveChangedMerchantGetPaidInfo = params =>
  new Promise((resolve, reject) => {
    const { merchantGetPaidInfo, shopID } = params;
    if (!shopID || Object.keys(merchantGetPaidInfo).length === 0)
      return reject(
        "(SaveChangedMerchantGetPaidInfo) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.SAVE_CHANGED_MERCHANT_GET_PAID_INFO, params)
      .then(resolve)
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save new info to modifier group

const SaveChangedModifierGroupInfo = params =>
  new Promise((resolve, reject) => {
    const { modifierGroupID, modifierGroupInfo, shopID } = params;
    if (!modifierGroupID || !modifierGroupInfo || !shopID)
      return reject(
        "(SaveChangedModifierGroupInfo) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.SAVE_CHANGED_MODIFIER_GROUP_INFO, params)
      .then(() => resolve(true))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save new info to modifier
const SaveChangedModifierInfo = params =>
  new Promise((resolve, reject) => {
    const { modifierID, modifierInfo, shopID } = params;
    if (!modifierID || !modifierInfo || !shopID)
      return reject("(SaveChangedModifierInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_MODIFIER_INFO, params)
      .then(() => resolve(true))
      .catch(reject);
  });

// -----------------------------------------------------------------------
// Save new open hours
const SaveChangedOpenHours = params =>
  new Promise((resolve, reject) => {
    const { openHours = {}, shopID } = params;
    if (!openHours || !shopID)
      return reject("(SaveChangedOpenHours) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_OPEN_HOURS, params)
      .then(() => resolve({ success: true }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Update the order pickup info

const SaveChangedPickUpInfo = params =>
  new Promise((resolve, reject) => {
    const { pickUpInfo = {} } = params;
    if (Object.keys(pickUpInfo).length === 0 || !params.shopID)
      return reject("(SaveChangedPickUpInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_PICKUP_INFO, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new info to shop basic info

const SaveChangedShopInfo = params =>
  new Promise((resolve, reject) => {
    const { shopID, shopInfo } = params;
    if (!shopID || !Object.keys(shopInfo).length === 0)
      return reject("(SaveChangedShopInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHANGED_SHOP_INFO, {
        shopID,
        shopInfo: InfoSanitizer.SanitizeShopInfo({ shopInfo }),
      })
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save check in

const SaveCheckInInfo = params =>
  new Promise((resolve, reject) => {
    const { customerCheckIn, shopID } = params;
    if (!Object.keys(customerCheckIn).length === 0 || !shopID)
      return reject("(SaveCheckInInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_CHECK_IN_INFO, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save the mailbox for the shop to combine orders
const SaveMailboxForCombineOrders = params =>
  new Promise((resolve, reject) => {
    const { mailbox_info = {}, mailbox_prefix = "", shopID } = params;
    if (Object.keys(mailbox_info).length === 0 || !mailbox_prefix || !shopID)
      return reject(
        "(SaveMailboxForCombineOrders) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.SAVE_MAILBOX_FOR_COMBINE_ORDERS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new all menu groups
const SaveNewAllGroups = params =>
  new Promise((resolve, reject) => {
    const { shopID } = params;
    if (!shopID)
      return reject("(SaveNewAllGroups) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_NEW_ALL_GROUPS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new all menu items

const SaveNewAllItems = params =>
  new Promise((resolve, reject) => {
    const { shopID } = params;
    if (!shopID)
      return reject("(SaveNewAllItems) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_NEW_ALL_ITEMS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new all modifier groups

const SaveNewAllModifierGroups = params =>
  new Promise((resolve, reject) => {
    const { shopID } = params;
    if (!shopID)
      return reject(
        "(SaveNewAllModifierGroups) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.SAVE_NEW_ALL_MODIFIER_GROUPS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save new all modifiers

const SaveNewAllModifiers = params =>
  new Promise((resolve, reject) => {
    const { shopID } = params;
    if (!shopID)
      return reject("(SaveNewAllModifiers) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_NEW_ALL_MODIFIERS, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Save personnel info

const SavePersonnelInfo = params =>
  new Promise((resolve, reject) => {
    const { personnelInfo, personnelPin, shopID } = params;
    if (!personnelPin || !Object.keys(personnelInfo).length === 0 || !shopID)
      return reject("(SavePersonnelInfo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_PERSONNEL_INFO, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Save website info
const SaveWebsite = params =>
  new Promise((resolve, reject) => {
    const { website = {}, shopID = "" } = params;
    if (!shopID || !website)
      return reject("(SaveWebsite) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SAVE_WEBSITE, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Submit Online Ordering Agreement
const SubmitOnlineOrderingAgreement = params =>
  new Promise((resolve, reject) => {
    const { formId = "" } = params;
    if (!formId)
      return reject(
        "(SubmitOnlineOrderingAgreement) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.SUBMIT_ONLINE_ORDERING_FORM, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

export default {
  AddGroupToMenu,
  AddItemToGroup,
  AddItemToGroupModifier,
  AddModifierToGroup,
  AddPrinter,
  AddMobileAppPrinter,
  ArchiveItem,
  ArchiveMenuGroup,
  ArchiveModifierGroup,
  ChangePrinterBrand,
  ChangePrinterInfoMobile,
  ChangeStatusOfActiveOrder,
  CreateCoupon,
  CreateNewMenuGroup,
  CreateNewMenu,
  CreateNewModifier,
  CreateNewModifierGroup,
  CreateNewShopPersonnel,
  CreateParseurMailbox,
  CreateRefundRequest,
  DeleteMenu,
  DeleteModifier,
  MoveActiveOrderToPastOrders,
  RemoveCoupon,
  RemoveGroupFromMenu,
  RemoveItemFromGroup,
  RemoveItemFromGroupModifier,
  SaveChangedCoupon,
  RemovePersonnel,
  RemovePrinter,
  RemoveMobileAppPrinter,
  SaveChangedDeliverInfo,
  SaveChangedGroupInfo,
  SaveChangedItemInfo,
  SaveChangedMenuInfo,
  SaveChangedMerchantGetPaidInfo,
  SaveChangedModifierGroupInfo,
  SaveChangedModifierInfo,
  SaveChangedOpenHours,
  SaveChangedPickUpInfo,
  SaveChangedShopInfo,
  SaveCheckInInfo,
  SaveMailboxForCombineOrders,
  SaveNewAllGroups,
  SaveNewAllItems,
  SaveNewAllModifierGroups,
  SaveNewAllModifiers,
  SavePersonnelInfo,
  SaveWebsite,
  SubmitOnlineOrderingAgreement,
};
