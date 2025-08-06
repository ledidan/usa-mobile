import { set } from "object-path-immutable";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const SEARCH_CATEGORIES = [
  { id: "customerName", label: "Name" },
  { id: "tableNumber", label: "Table" },
];

const FindMatchingOrders = ({
  filterBy = "",
  orders = {},
  searchText = "",
}) => {
  if (!searchText) return orders;
  return Object.keys(orders).reduce((result, orderID) => {
    const value = orders[orderID][filterBy] || "";
    if (!value) return result;
    return value.toLowerCase().include(searchText)
      ? set(result, orderID, orders[orderID])
      : result;
  });
};

const _pad = n => (n < 10 ? "0" + n : n);
const _convertDateFormat = ({ date }) => {
  const { day, month, year } = date;
  return `${year}-${_pad(month)}-${_pad(day)}`;
};

const _convertDateRangeToUtc = ({
  selectedDayRange,
  timeZone = "America/New_York",
}) => {
  const { from, to } = selectedDayRange;
  let from_utc, to_utc;
  if (from) {
    from_utc = dayjs
      .tz(_convertDateFormat({ date: from }), timeZone)
      .startOf("day")
      .utc()
      .format();
  }
  if (to) {
    to_utc = dayjs
      .tz(_convertDateFormat({ date: to }), timeZone)
      .endOf("day")
      .utc()
      .format();
  }
  return { from_utc, to_utc };
};
export { _convertDateRangeToUtc, FindMatchingOrders, SEARCH_CATEGORIES };
