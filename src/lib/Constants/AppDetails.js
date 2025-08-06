import DeviceInfo from "react-native-device-info";

const APP_DETAILS_INFO = ({ check_nextpush_update }) => [
  { id: "name", label: "Name", value: "Skipli For Business" },
  {
    id: "appVersion",
    label: "App Version",
    value: `${DeviceInfo.getVersion()}`,
  },
  { id: "bes", label: "BES", value: "skbetech" },
  {
    id: "nexpushVersion",
    label: "Nexpush Version",
    value: "14",
    button: { label: "Check Update", action: check_nextpush_update },
  },
  {
    id: "merchantSupportEmail",
    label: "Merchant Support Email",
    value: "accounts@skiplinow.com",
  },
  {
    id: "merchantSupportPhone",
    label: "Merchant Support Phone",
    value: "(678) 999-1044",
  },
  {
    id: "guestSupportEmail",
    label: "Guest Support Email",
    value: "support@skiplinow.com",
  },
  {
    id: "guestSupportPhone",
    label: "Guest Support Phone",
    value: "(678) 999-1039",
  },
];

export { APP_DETAILS_INFO };
