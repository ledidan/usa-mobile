// BUTI DINERS, INC. All right Reserved ©

import { set } from "object-path-immutable";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

// Lib
import { Constants, Services } from "lib";
const {
  DAYS_IN_A_WEEK,
  DATE_FORMAT,
  DEFAULT_TIMEZONE,
  TIME_FORMAT,
} = Constants;

// ----------------------------------------------------------------
// Convert a set of extra hours into local time
const _convertExtraHours = async ({ extraHours, timeZone }) => {
  const result = await Object.keys(extraHours).reduce(
    async (previousPromise, timeId) => {
      const previousResult = await previousPromise;
      const convertedTime = await _convertHoursToLocal({
        hours: extraHours[timeId],
        timeZone,
      });
      return set(previousResult, `${timeId}`, convertedTime);
    },
    Promise.resolve({}),
  );
  return result;
};

// ----------------------------------------------------------------
// Convert UTC hours to local 24 Hr and 12 Hr
const _convertHoursToLocal = async ({ hours, timeZone }) => {
  const { endAt = "", startAt = "" } = hours;
  const { BUTI } = Services;
  const { ConvertUTCToLocalTime } = BUTI.GetRequests;
  let localEndAt = "",
    localStartAt = "";
  if (endAt) {
    const { localTime = "" } = await ConvertUTCToLocalTime({
      utc_time: endAt,
      timeZone,
    });
    localEndAt = localTime;
  }
  if (startAt) {
    const { localTime = "" } = await ConvertUTCToLocalTime({
      utc_time: startAt,
      timeZone,
    });
    localStartAt = localTime;
  }
  return {
    localEndAt,
    localEndAt12Hr: _convertTime24to12(localEndAt),
    localStartAt,
    localStartAt12Hr: _convertTime24to12(localStartAt),
  };
};

// ----------------------------------------------------------------
// Convert 24 hour time to am/pm
const _convertTime24to12 = (time24 = "") => {
  if (!time24) return "";
  let tmpArr = time24.split(":"),
    result = "";
  if (+tmpArr[0] === 12) result = tmpArr[0] + ":" + tmpArr[1] + " PM";
  else if (+tmpArr[0] === 0) result = "12:" + tmpArr[1] + " AM";
  else if (+tmpArr[0] > 12) result = +tmpArr[0] - 12 + ":" + tmpArr[1] + " PM";
  else result = +tmpArr[0] + ":" + tmpArr[1] + " AM";
  return String(result) === "undefined" ? "" : result;
};

// ----------------------------------------------------------------
// Convert UTC tinestamp created by moment().toISOString()
// into local date & time
const _convertUTCTimestampToLocalTime = ({ localTimeZone, timeStamp }) => {
  if (!timeStamp) return "";
  const local_date = formatToTimeZone(timeStamp, DATE_FORMAT, {
    timeZone: localTimeZone || DEFAULT_TIMEZONE,
  });
  const local_time = formatToTimeZone(timeStamp, TIME_FORMAT, {
    timeZone: localTimeZone || DEFAULT_TIMEZONE,
  });
  return { local_date, local_time };
};

// ----------------------------------------------------------------
// Returns one of "monday", "tuesday", "wednesday", "thursday",
// "friday", "saturday", "sunday"
const GetTodayDay = async () => {
  const { BUTI } = Services;
  const { GetCurrentUTCTimestamp } = BUTI.GetRequests;
  const { currentTimestamp } = await GetCurrentUTCTimestamp();
  const today = new Date(currentTimestamp);
  return Object.keys(DAYS_IN_A_WEEK).find(day => {
    const { id } = DAYS_IN_A_WEEK[day];
    return parseInt(id) === parseInt(today.getDay());
  });
};

export default {
  _convertExtraHours,
  _convertHoursToLocal,
  _convertTime24to12,
  _convertUTCTimestampToLocalTime,
  GetTodayDay,
};
