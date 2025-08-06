const _createEmailRequestToSkipli = ({
  isReport = true,
  issue = "",
  phoneNumber = "",
  selectedDate = "",
  selectedTime = "",
  desc = "",
  personnel = {},
  shopBasicInfo = {},
  id = "",
}) => {
  const { personnelName } = personnel;
  const { name: shopName, timeZone } = shopBasicInfo;
  const email_body_meeting = `Hi\r\n\r\n${personnelName} from ${shopName}, I would like to schedule a technical support meeting on ${selectedTime} at ${selectedDate}.\r\nMy timezone is: ${timeZone}.\r\nMy issue is: ${desc}.\r\nMy phone number is: ${phoneNumber}`;
  const email_body_report_issue = `Hi\r\n\r\n${personnelName} from ${shopName}, I would like to report an issue.\r\nMy timezone is: ${timeZone}.\r\nMy issue is: ${desc}. My phone number: ${phoneNumber}`;
  return {
    email_body: isReport ? email_body_report_issue : email_body_meeting,
    email_subject: isReport
      ? `[ISSUE ID: ${id}] ${shopName} reported an issue with ${issue}`
      : `[SUPPORT ID: ${id}] ${shopName} requested techinical support ${issue}`,
  };
};
function _formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7)
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
}

export { _createEmailRequestToSkipli, _formatPhoneNumber };
