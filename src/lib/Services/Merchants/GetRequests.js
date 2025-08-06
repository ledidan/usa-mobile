// BUTI DINERS, INC. All right Reserved ©

import API_PATHS from "../API_Paths";
import axios from "axios";

const {
  GET_QZ_DIGITAL_CERTIFICATE,
  GET_QZ_SIGNATURE,
  GET_SHOP_ACTIVE_COUPONS,
  GET_SHOP_ACTIVE_PRINTERS,
  GET_SHOP_MOBILE_ACTIVE_PRINTERS,
  GET_SHOP_ALL_GROUPS,
  GET_SHOP_ALL_ITEMS,
  GET_SHOP_ALL_MENUS,
  GET_SHOP_BASIC_INFO,
} = API_PATHS;

// ---------------------------------------------------------------
// Check if the items in cart are not out of stock

const CheckIfItemsAreInStock = ({ itemIDs = [], shopID = "" }) =>
  new Promise((resolve, reject) => {
    if (itemIDs.length === 0 || !shopID) {
      const msg = "(CheckIfItemsAreInStock) Parameters are not sufficient.";
      return reject(msg);
    }
    axios
      .get(API_PATHS.CHECK_IF_ITEMS_ARE_IN_STOCK, {
        params: { itemIDs, shopID },
      })
      .then(({ data }) =>
        resolve({
          outOfStockItemIDs: data.outOfStockItemIDs || [],
          success: true,
        }),
      )
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Initialize the Stripe Connect account creation/onboarding process
// for merchants

const CreateStripeConnectAccount = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject(
        "(CreateStripeConnectAccount) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.CREATE_STRIPE_CONNECT_ACCOUNT, { params: { shopID } })
      .then(({ data }) => resolve({ stripeConnectOnboardingUrl: data || "" }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all modifier groups

const GetAllModifierGroups = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetAllModifierGroups) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_ALL_MODIFIER_GROUPS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          allModifierGroups: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all modifiers

const GetAllModifiers = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetAllModifiers) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_ALL_MODIFIERS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          allModifiers: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information of combine third party orders of a shop
const GetCombineThirdPartyOrdersInfo = params =>
  new Promise((resolve, reject) => {
    if (!params.shopID)
      return reject(
        "(GetCombineThirdPartyOrdersInfo) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_COMBINE_THIRD_PARTY_ORDERS_INFO, { params })
      .then(({ data }) => resolve({ combineThirdPartyOrdersInfo: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information of a modifier group
const GetGroupModifierInformation = params =>
  new Promise((resolve, reject) => {
    if (!params.modifierID || !params.shopID)
      return reject(
        "(GetGroupModifierInformation) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_GROUP_MODIFIER_INFORMATION, { params })
      .then(({ data }) =>
        resolve({
          modifierInfo: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the converted menu from woflow

const GetMenuFromWoflow = params =>
  new Promise((resolve, reject) => {
    if (!params.woflowMenuId)
      return reject("(GetMenuFromWoflow) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_MENU_FROM_WOFLOW, { params })
      .then(({ data }) => resolve({ menu: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information for a group

const GetMenuGroupInformation = ({ groupID, shopID }) =>
  new Promise((resolve, reject) => {
    if (!groupID || !shopID)
      return reject("(GetMenuGroupInformation) Parameters are not sufficient.");
    const params = { groupID, shopID };
    axios
      .get(API_PATHS.GET_MENU_GROUP_INFORMATION, { params })
      .then(({ data }) =>
        resolve({
          groupInfo: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get sales report data

const GetSalesReportData = () =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_SALES_REPORT_DATA, { params: {} })
      .then(({ data }) => resolve({ salesReportData: data || {} }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information for an item
const GetMenuItemInformation = params =>
  new Promise((resolve, reject) => {
    if (!params.itemID || !params.shopID)
      return reject("(GetMenuItemInformation) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_MENU_ITEM_INFORMATION, { params })
      .then(({ data }) =>
        resolve({
          itemInfo: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the merchant get paid info
const GetMerchantGetPaidInfo = params =>
  new Promise((resolve, reject) => {
    if (!params.shopID)
      return reject("(GetMerchantGetPaidInfo) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_MERCHANT_GET_PAID_INFO, { params })
      .then(({ data }) => resolve({ merchantGetPaidInfo: data || {} }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information for a modifier group
const GetMenuModifierGroupInformation = params =>
  new Promise((resolve, reject) => {
    if (!params.modifierGroupID || !params.shopID)
      return reject(
        "(GetMenuModifierGroupInformation) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_MENU_MODIFIER_GROUP_INFORMATION, { params })
      .then(({ data }) =>
        resolve({
          modifierGroupInfo: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the transactions associated with the payout
const GetPayoutTransactions = params =>
  new Promise((resolve, reject) => {
    if (!params.payoutId || !params.stripeAccountId)
      return reject("(GetPayoutTransactions) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_PAYOUT_TRANSACTIONS, { params })
      .then(({ data = {} }) => resolve({ transactions_info: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information of an online ordering agreement
const GetOnlineOrderingAgreement = params =>
  new Promise((resolve, reject) => {
    if (!params.formId)
      return reject(
        "(GetOnlineOrderingAgreement) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_ONLINE_ORDERING_AGREEMENT, { params })
      .then(({ data = {} }) => resolve({ form: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all payouts for the connected account
const GetPayoutsForConnectedAccount = params =>
  new Promise((resolve, reject) => {
    if (!params.stripe_account_id)
      return reject(
        "(GetPayoutsForConnectedAccount) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_PAYOUTS_FOR_CONNECTED_ACCOUNT, { params })
      .then(({ data = {} }) => resolve({ payouts_info: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get QZ Digital Certificate

const GetQZDigitalCertificate = () =>
  new Promise((resolve, reject) => {
    axios
      .get(GET_QZ_DIGITAL_CERTIFICATE, {})
      .then(cert => resolve(cert))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get QZ Digital Signature

const GetQZSignature = params =>
  new Promise((resolve, reject) => {
    axios
      .get(GET_QZ_SIGNATURE, { params })
      .then(sign => resolve(sign))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information for a modifier

const GetMenuModifierInformation = params =>
  new Promise((resolve, reject) => {
    if (!params.modifierID || !params.shopID)
      return reject(
        "(GetMenuModifierInformation) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_MENU_MODIFIER_INFORMATION, { params })
      .then(({ data }) =>
        resolve({
          modifierInfo: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all active coupons

const GetShopActiveCoupons = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopActiveCoupons) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_ACTIVE_COUPONS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          activeCoupons: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get active Printers

const GetShopActivePrinters = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopActivePrinters) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_ACTIVE_PRINTERS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          addedPrinters: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// [Mobile] Get active Printers

const GetShopMobileAppActivePrinters = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopActivePrinters) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_MOBILE_ACTIVE_PRINTERS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          addedPrinters: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all groups

const GetShopAllGroups = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopAllGroups) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_ALL_GROUPS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          allGroups: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all items

const GetShopAllItems = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopAllItems) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_ALL_ITEMS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          allItems: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all menus

const GetShopAllMenus = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopAllMenus) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_ALL_MENUS, { params: { shopID } })
      .then(({ data }) =>
        resolve({
          allMenus: typeof data === "string" ? JSON.parse(data) : data,
        }),
      )
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get all personnels of the shop

const GetShopAllPersonnels = params =>
  new Promise((resolve, reject) => {
    if (!params.shopID)
      return reject("(GetShopAllPersonnels) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_ALL_PERSONNELS, { params })
      .then(({ data }) => resolve({ allPersonnels: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the basic information of a shop using its unique id

const GetShopBasicInfo = ({ shopID }) =>
  new Promise((resolve, reject) => {
    if (!shopID)
      return reject("(GetShopBasicInfo) Parameters are not sufficient.");
    axios
      .get(GET_SHOP_BASIC_INFO, { params: { shopID } })
      .then(({ data }) => resolve({ shopBasicInfo: data || {}, success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Get the orders of a shop using its unique id and ordersType ("active", "past")

const GetShopOrders = params =>
  new Promise((resolve, reject) => {
    if (!["active", "past"].includes(params.ordersType) || !params.shopID)
      return reject("(GetShopOrders) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_ORDERS, { params })
      .then(({ data }) => resolve({ orders: data || {} }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the information for personnel
const GetShopPersonnelInfo = params =>
  new Promise((resolve, reject) => {
    if (!params.personnelID || !params.shopID)
      return reject("(GetShopPersonnelInfo) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_PERSONNEL_INFORMATION, { params })
      .then(({ data }) =>
        resolve({ personnel: data.personnel || {}, success: true }),
      )
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Get the shop's website information
const GetWebsiteInfo = params =>
  new Promise((resolve, reject) => {
    if (!params.shopID)
      return reject("(GetWebsiteInfo) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_SHOP_WEBSITE_INFO, { params })
      .then(({ data = {} }) => resolve({ website: data, success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Verify the pin entered by personnel
const VerifyPersonnelPin = params =>
  new Promise((resolve, reject) => {
    if (!params.personnelPin || !params.shopID)
      return reject("(VerifyPersonnelPin) Parameters are not sufficient.");
    axios
      .get(API_PATHS.VERIFY_PERSONNEL_PIN, { params })
      .then(({ data }) =>
        resolve({ personnelID: data.personnelID, success: true }),
      )
      .catch(() => resolve({ success: false }));
  });

export default {
  CheckIfItemsAreInStock,
  CreateStripeConnectAccount,
  GetAllModifierGroups,
  GetAllModifiers,
  GetCombineThirdPartyOrdersInfo,
  GetGroupModifierInformation,
  GetMenuFromWoflow,
  GetMenuGroupInformation,
  GetMenuItemInformation,
  GetMerchantGetPaidInfo,
  GetOnlineOrderingAgreement,
  GetPayoutsForConnectedAccount,
  GetSalesReportData,
  GetMenuModifierGroupInformation,
  GetMenuModifierInformation,
  GetPayoutTransactions,
  GetQZDigitalCertificate,
  GetQZSignature,
  GetShopActiveCoupons,
  GetShopActivePrinters,
  GetShopMobileAppActivePrinters,
  GetShopAllGroups,
  GetShopAllItems,
  GetShopAllMenus,
  GetShopAllPersonnels,
  GetShopBasicInfo,
  GetShopOrders,
  GetShopPersonnelInfo,
  GetWebsiteInfo,
  VerifyPersonnelPin,
};
