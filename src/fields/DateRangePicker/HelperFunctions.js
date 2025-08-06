// BUTI DINERS, INC. All right Reserved ©
import { Constants } from "lib";
const { MONTHS } = Constants;
const _convertGMTStringtoDateObject = gmtString => {
  if (!gmtString) return null;
  const dayElememts = gmtString.split(" ");
  //["Mon", "May", "03", "2021", "00:00:00", "GMT-0400", "(EDT)"]
  return {
    day: parseInt(dayElememts[2]),
    month: MONTHS[dayElememts[1]],
    year: parseInt(dayElememts[3]),
  };
};
const pad = n => {
  return n < 10 ? "0" + n : n;
};

const _convertDateObjectToString = (date = {}) => {
  if (!date) return "";
  const { day = "", month = "", year = "" } = date;
  return `${pad(month)}/${pad(day)}/${year}`;
};

export { _convertDateObjectToString, _convertGMTStringtoDateObject };
