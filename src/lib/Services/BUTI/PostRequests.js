// BUTI DINERS, INC. All right Reserved ©

import API_PATHS from "../API_Paths";
import axios from "axios";

// -----------------------------------------------------------------------
// Change a group's image in the menu

const ChangeMenuGroupImage = params =>
  new Promise((resolve, reject) => {
    const { image } = params;
    if (!image || !image.imageURL || !params.groupID || !params.shopID)
      return reject("(ChangeMenuGroupImage) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_MENU_GROUP_IMAGE, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Change an item's image in the menu

const ChangeMenuItemImage = params =>
  new Promise((resolve, reject) => {
    const { image } = params;
    if (!image || !image.imageURL || !params.itemID || !params.shopID)
      return reject("(ChangeMenuItemImage) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_MENU_ITEM_IMAGE, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Change the shop's logo
const ChangeShopLogo = params =>
  new Promise((resolve, reject) => {
    if (!params.logoURL || !params.shopID)
      return reject("(ChangeShopLogo) Parameters are not sufficient.");
    axios
      .post(API_PATHS.CHANGE_SHOP_LOGO, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Change the shop's thumbnail image
const ChangeShopThumbnailImage = params =>
  new Promise((resolve, reject) => {
    if (!params.thumbnailImg || !params.shopID)
      return reject(
        "(ChangeShopThumbnailImage) Parameters are not sufficient.",
      );
    axios
      .post(API_PATHS.CHANGE_SHOP_THUMBNAIL_IMAGE, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Generate PDF Receipt from Backend

const GetCustomerItemizedReceipt = params =>
  new Promise((resolve, reject) => {
    if (
      !params.orderID ||
      !params.orderDetails ||
      !params.shopAddress ||
      !params.shopName ||
      !params.timeZone
    )
      return reject(
        "(GetCustomerItemizedReceipt) Parameter are not sufficient",
      );
    axios
      .post(API_PATHS.GET_CUSTOMER_ITEMIZED_RECEIPT, params, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => resolve({ pdfData: data, success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Save the Stripe Connect user's credentials via the authorization code
// created during onboarding

const SaveMerchantStripeAccountID = params =>
  new Promise((resolve, reject) => {
    if (!params.stripeConnectAuthCode || !params.shopID) {
      return reject(
        "(SaveMerchantStripeAccountID) Parameters are not sufficient.",
      );
    } else {
      axios
        .post(API_PATHS.SAVE_MERCHANT_STRIPE_ACCOUNT_ID, params)
        .then(() => resolve({ success: true }))
        .catch(() => resolve({ success: false }));
    }
  });

// -----------------------------------------------------------------------
// Send a text message via the BE

const SendTextMessage = params =>
  new Promise((resolve, reject) => {
    if (!params.body || !params.to)
      return reject("(SendTextMessage) Parameters are not sufficient.");
    axios
      .post(API_PATHS.SEND_TEXT_MESSAGE, params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// -----------------------------------------------------------------------
// Send an email via the BE
const SendEmail = params =>
  new Promise((resolve, reject) => {
    if (!params.addresses || !params.body || !params.subject || !params.shop_id)
      return reject("(SendEmail) Parameters are not sufficient.");
    const { shop_id, ...email_params } = params;

    axios
      .post(API_PATHS.SEND_EMAIL, email_params)
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Upload an image to AWS and return a link path to the image
const UploadImageToAws = params =>
  new Promise((resolve, reject) => {
    if (!params.imageFile || !params.imageName)
      return reject("(UploadImageToAws) Parameters are not sufficient.");
    axios
      .post(API_PATHS.UPLOAD_IMAGE_TO_AWS, params)
      .then(({ data }) => {
        resolve({ imageURL: data.imageURL || "", success: true });
      })
      .catch(() => resolve({ success: false }));
  });

export default {
  ChangeMenuGroupImage,
  ChangeMenuItemImage,
  ChangeShopLogo,
  ChangeShopThumbnailImage,
  GetCustomerItemizedReceipt,
  SaveMerchantStripeAccountID,
  SendTextMessage,
  SendEmail,
  UploadImageToAws,
};
