// BUTI DINERS, INC. All right Reserved ©

import React from "react";
import {
  AllOrdersIcon,
  // CombineOrdersIcon,
  // AmplifierIcon,
  BarChartIcon,
  FinancesIcon,
  HomeIcon,
  HelpIcon,
  MenusIcon,
  OpenSignIcon,
  PaymentsIcon,
  SignalIcon,
  SettingsIcon,
  SkipliLogoCircleIcon,
  SmallKiosk,
  UserSilhouetteIcon,
  WebPageIcon,
} from "assets/Icons";

// Constants

const CUSTOMER_PROFILE_MODULES = {
  viewProfile: { label: "View Profile" },
  pastOrders: { label: "Past Orders" },
  paymentMethods: { label: "Payment Methods" },
};

const MAX_SUB_NAVBAR_ITEMS = 5;

// const MOBILE_NAVBAR_ITEMS = [
//   {
//     id: "orders",
//     label: "live orders",
//     icon: <SignalIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "pastOrders",
//     label: "past orders",
//     icon: <AllOrdersIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "menusManagement",
//     label: "Menu",
//     icon: <MenusIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "preparation",
//     label: "Business Hours",
//     icon: <OpenSignIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "help",
//     label: "Support",
//     icon: <HelpIcon className={Style.mobileNavbarIcon} />,
//   },
//   // {
//   //   id: "combineThirdPartyOrders",
//   //   label: "Combine Orders",
//   //   icon: <CombineOrdersIcon className={Style.mobileNavbarIcon} />,
//   // },
//   {
//     id: "analytics",
//     label: "Analytics",
//     icon: <BarChartIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "paymentInfo",
//     label: "Bank Account",
//     icon: <FinancesIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "payoutsForConnectedAccount",
//     label: "Payouts",
//     icon: <PaymentsIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "customerSelfCheckIn",
//     label: "Customer Check In",
//     icon: <SmallKiosk className={Style.mobileNavbarIcon} />,
//   },
//   // {
//   //   id: "marketing",
//   //   label: "Marketing",
//   //   icon: <AmplifierIcon className={Style.mobileNavbarIcon} />,
//   // },
//   {
//     id: "shopInfo",
//     label: "Your Store",
//     icon: <HomeIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "personnelProfile",
//     label: "Users",
//     icon: <UserSilhouetteIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "settings",
//     label: "Settings",
//     icon: <SettingsIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "website",
//     label: "Your Website",
//     icon: <WebPageIcon className={Style.mobileNavbarIcon} />,
//   },
//   {
//     id: "skipliDev",
//     label: "Skipli Dev",
//     icon: <SkipliLogoCircleIcon className={Style.mobileNavbarIcon} />,
//   },
// ];

const MENUS_MANAGEMENT_NAVBAR_ITEMS = [
  //{
  //   id: "allMenus",
  //   label: "Menus",
  // },
  // {
  //   id: "allGroups",
  //   label: "Categories",
  // },
  {
    id: "allItems",
    label: "Items",
  },
  // {
  //   id: "allModifierGroups",
  //   label: "Modifier Groups",
  // },
  // {
  //   id: "allModifiers",
  //   label: "Modifiers",
  // },
];

// ----------------------------------------------------------
// Admin interface: sub navbar items in Orders
const ORDERS_NAVBAR_ITEMS = [
  {
    id: "activeOrders",
    label: "Active",
  },
  {
    id: "pastOrders",
    label: "Completed",
  },
];

const PREPARATION_SUBNAV_ITEMS = [
  {
    id: "inStore",
    label: "Open Hours",
  },
  {
    id: "catering",
    label: "Catering",
  },
];

export {
  CUSTOMER_PROFILE_MODULES,
  MAX_SUB_NAVBAR_ITEMS,
  MENUS_MANAGEMENT_NAVBAR_ITEMS,
  //MOBILE_NAVBAR_ITEMS,
  ORDERS_NAVBAR_ITEMS,
  PREPARATION_SUBNAV_ITEMS,
};
