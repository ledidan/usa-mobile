// BUTI DINERS, INC. All right Reserved ©

import BUTI from "./BUTI";
import Merchants from "./Merchants";

const LIVE_MODE_ENABLED = () => {
  const { NODE_ENV } = process.env;
  return NODE_ENV !== "development";
};

const SKIPLI_DASHBOARD_DEV_URL =
  "https://57cb-2402-800-6347-5208-e0a5-8863-6120-4d3d.ngrok-free.app";
const SKIPLI_DASHBOARD_PROD_URL = "https://gate-of-erebor.herokuapp.com";
1;
const SKIPLI_DASHBOARD_URL = LIVE_MODE_ENABLED()
  ? SKIPLI_DASHBOARD_PROD_URL
  : SKIPLI_DASHBOARD_DEV_URL;

const DEV_BASE_URL = "https://www.skbetech.com";

const PROD_BASE_URL = "https://www.skbetech.com";
const BASE_URL = LIVE_MODE_ENABLED() ? PROD_BASE_URL : DEV_BASE_URL;

const FRONT_END_DEV_BASE_URL = "http://localhost:4000";
const FRONT_END_PROD_BASE_URL = "https://admin.skiplinow.com";
const FRONT_END_BASE_URL = LIVE_MODE_ENABLED()
  ? FRONT_END_PROD_BASE_URL
  : FRONT_END_DEV_BASE_URL;

const CUSTOMER_INTERFACE_DEV_BASE_URL = "https://localhost:3000";
const CUSTOMER_INTERFACE_PROD_BASE_URL = "https://skiplinow.com";
const CUSTOMER_INTERFACE_BASE_URL = LIVE_MODE_ENABLED()
  ? CUSTOMER_INTERFACE_PROD_BASE_URL
  : CUSTOMER_INTERFACE_DEV_BASE_URL;

// -------------- BUTI DINERS METHODS --------------
// POST METHODS
const ADD_EMAIL_TO_MAILING_LIST = `${BASE_URL}/addEmail`;

// -------------- RESTAURANT METHODS --------------
// GET METHODS
const CREATE_STRIPE_CONNECT_ACCOUNT = `${BASE_URL}/createStripeConnectAccount`;

// POST METHODS
const POST_NEW_SHOP_STRIPE_CONNECT_INFO = `${BASE_URL}/updateShopStripeConnectInfo`;

export default {
  BUTI,
  LIVE_MODE_ENABLED,
  Merchants,
  ADD_EMAIL_TO_MAILING_LIST,
  CREATE_STRIPE_CONNECT_ACCOUNT,
  CUSTOMER_INTERFACE_BASE_URL,
  FRONT_END_BASE_URL,
  POST_NEW_SHOP_STRIPE_CONNECT_INFO,
  SKIPLI_DASHBOARD_SOCKET_IO_URL: SKIPLI_DASHBOARD_URL,
  SOCKET_IO_URL: BASE_URL,
};
