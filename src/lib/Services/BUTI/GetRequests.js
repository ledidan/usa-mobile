// BUTI DINERS, INC. All right Reserved ©

import API_PATHS from "../API_Paths";
import axios from "axios";

// ---------------------------------------------------------------
// Convert a localized time to UTC

const ConvertLocalTimeToUTC = params =>
  new Promise((resolve, reject) => {
    if (!params.localTime || !params.timeZone)
      return reject("(ConvertLocalTimeToUTC) Parameters are not sufficient.");
    axios
      .get(API_PATHS.CONVERT_LOCAL_TIME_TO_UTC, { params })
      .then(({ data }) =>
        resolve({ success: true, utc_time: data.utc_time || "" }),
      )
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Convert UTC time to local time

const ConvertUTCToLocalTime = params =>
  new Promise((resolve, reject) => {
    if (!params.utc_time || !params.timeZone)
      return reject("(ConvertUTCToLocalTime) Parameters are not sufficient.");
    axios
      .get(API_PATHS.CONVERT_UTC_TIME_TO_LOCAL_TIME, { params })
      .then(({ data }) =>
        resolve({ success: true, localTime: data.localTime || "" }),
      )
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Get current UTC timestamp

const GetCurrentUTCTimestamp = () =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_CURRENT_UTC_TIMESTAMP)
      .then(({ data }) => resolve({ currentTimestamp: data }))
      .catch(reject);
  });

// ---------------------------------------------------------------
// Get the URL of a Stripe receipt associated with the given PaymentIntent

const GetCustomerStripeReceipt = ({ paymentIntentID }) =>
  new Promise((resolve, reject) => {
    if (!paymentIntentID)
      return reject(
        "(GetCustomerStripeReceiptURL) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.GET_CUSTOMER_STRIPE_RECEIPT, {
        params: { paymentIntentID },
      })
      .then(({ data }) => resolve({ receiptURL: data, success: true }))
      .catch(() => resolve({ receiptURL: "", success: false }));
  });

// ---------------------------------------------------------------
// Get the endAt and startAt value of selected timerange.
// the values of endAt and startAt are UTC ISO 8601

const GetTimeRange = ({ timeRange, timeZone }) =>
  new Promise((resolve, reject) => {
    if (!timeRange || !timeZone)
      return reject("(GetTimeRange) Parameters are not sufficient.");
    axios
      .get(API_PATHS.GET_TIME_RANGE, { params: { timeRange, timeZone } })
      .then(({ data }) => {
        const { endAt = "", startAt = "" } = data;
        resolve({ endAt, startAt, success: true });
      })
      .catch(() => resolve({ success: false }));
  });

// ---------------------------------------------------------------
// Search the shops that match the shop name for merchant dashboard access
const SearchShopsForMerchantDashboard = params =>
  new Promise((resolve, reject) => {
    if (!params.shopName)
      return reject(
        "(SearchShopsForMerchantDashboard) Parameters are not sufficient.",
      );
    axios
      .get(API_PATHS.SEARCH_SHOPS_FOR_MERCHANT_DASHBOARD, {
        params,
        timeout: 3000,
      })
      .then(({ data = {} }) => resolve({ matched_shops: data }))
      .catch(reject);
  });

export default {
  ConvertLocalTimeToUTC,
  ConvertUTCToLocalTime,
  GetCurrentUTCTimestamp,
  GetCustomerStripeReceipt,
  GetTimeRange,
  SearchShopsForMerchantDashboard,
};
