// BUTI DINERS, INC. All right Reserved ©

import dayjs from "dayjs";
import _round from "lodash.round";

// Lib
import { Constants } from "lib";

var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const _convertDateToLocalDate = data => {
  const { DATE_FORMAT, DEFAULT_TIMEZONE } = Constants;
  const {
    date,
    localFormat = DATE_FORMAT,
    originalFormat = "",
    timeZone = DEFAULT_TIMEZONE,
  } = data;
  return dayjs(date, originalFormat).tz(timeZone).format(localFormat);
};

const _formatPhoneNumber = (phoneNumberString = "") => {
  const cleaned = ("" + String(phoneNumberString)).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return "";
};

const _isTrue = (value = "") => {
  if (!value) return false;
  else if (typeof value === "boolean") return value;
  else if (typeof value === "string") return value === "true";
  return value;
};

const _generateRandomID = () =>
  String(Math.floor(100000 + Math.random() * 900000)) +
  String.fromCharCode(97 + Math.floor(Math.random() * 26));

const _getDeviceDimension = () => ({
  height: window.screen.height,
  width: window.screen.width,
});

// ------------------------------------------------------
// Return the value as a String, rounded by the number of decimals
// 11 -> 11.00
// 10.5 -> 10.50
const _roundNumber = (value, decimals = 2) =>
  _round(isNaN(value) ? 0 : value, decimals);

const _scrollTo = ({
  behavior = "instant",
  block = "start",
  position = "relative",
  ref = {},
  top = "-120px",
}) => {
  if (Object.keys(ref).length > 0) {
    let i_pos = ref.style.position;
    let i_top = ref.style.top;
    ref.style.position = position;
    ref.style.top = top;
    ref.scrollIntoView({ behavior, block });
    ref.style.top = i_top;
    ref.style.position = i_pos;
  }
};

export {
  _convertDateToLocalDate,
  _formatPhoneNumber,
  _isTrue,
  _generateRandomID,
  _getDeviceDimension,
  _roundNumber,
  _scrollTo,
};
