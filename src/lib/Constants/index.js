// BUTI DINERS, INC. All right Reserved ©

import React from "react";

// Icons
import { DeliverIcon, DineInIcon, LunchBagIcon } from "assets/Icons";

import {
  CUSTOMER_PROFILE_MODULES,
  MAX_SUB_NAVBAR_ITEMS,
  MENUS_MANAGEMENT_NAVBAR_ITEMS,
  MOBILE_NAVBAR_ITEMS,
  ORDERS_NAVBAR_ITEMS,
  PREPARATION_SUBNAV_ITEMS,
} from "./NavbarItems";

import { AVERAGE_PREPARATION_TIMES, NEW_ITEM_FIELDS } from "./Miscellaneous";
import REGEX from "./RegEx";

import TestReceipt from "./TestReceipt.json";
import { APP_DETAILS_INFO } from "./AppDetails";
const ORDER_DELIVERY_TYPES = {
  inStore: { icon: <DineInIcon />, label: "In Store" },
  pickUp: { icon: <LunchBagIcon />, label: "Pick Up" },
  deliver: { icon: <DeliverIcon />, label: "Delivery" },
};

const DAYS_IN_A_WEEK = {
  monday: { id: 1 },
  tuesday: { id: 2 },
  wednesday: { id: 3 },
  thursday: { id: 4 },
  friday: { id: 5 },
  saturday: { id: 6 },
  sunday: { id: 7 },
};
const MONTHS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
const DATE_FORMAT = "MMM-DD-YYYY";
const DEFAULT_TIMEZONE = "America/New_York";
const TIME_FORMAT = "hh:mm A";
const TEST_SHOP_IDS = [
  "-Lbe5A3_INAGsRo6oT6v",
  "-Ldni3ONVYI4zUyAPlIs",
  "-LmGuqY0-ArNrVLK0tSx",
];

const TIME_RANGE_OPTIONS = {
  today: { label: "today", description: "today" },
  "1d": { label: "1d", description: "yesterday" },
  "1w": { label: "1w", description: "1 week" },
  "4w": { label: "4w", description: "4 weeks" },
  // all: { label: "All", description: "all time" },
};

const PAYMENT_WALLET_OPTIONS = {
  CARD: "CARD",
  PAYMENT_REQUEST: "PAYMENT_REQUEST",
};

const CUSTOMER_REWARD_TYPES = {
  ON_SALE_ITEMS: "Items on Sale",
  COUPONS: "Coupons",
};

const CUSTOMER_REWARD_TYPES_IMG_URLS = {
  ON_SALE_ITEMS: "https://i.imgur.com/MWoheLN.jpg",
  COUPONS: "https://i.imgur.com/oTVRhYM.jpg",
};

const COUPON_TYPES = {
  BUY_ONE_GET_ONE: {
    description: "Select items from the menu to offer buy one, get one on",
    header: "Buy One, Get One",
  },
  DISCOUNT_ON_ORDERS_ABOVE_X: {
    description: "Set a flat discount if the price exceeds an amount $X",
    header: "Discount on orders above $X",
  },
  COMBOS: {
    description: "Create combos on different items from the menu",
    header: "Combos",
    comingSoon: true,
  },
  DISCOUNT_ON_TOTAL_AMOUNT: {
    description: "Set a discount on the total amount of the order",
    header: "Discount on final Order",
    comingSoon: true,
  },
};

const BOGO_CHOICES = {
  sameCategory: {
    label: "Same category",
    example: "Buy one, get one on Burgers",
  },
  differentCategories: {
    label: "Different categories",
    example: "Buy one Burger, get one Side free",
  },
};

export default {
  APP_DETAILS_INFO,
  AVERAGE_PREPARATION_TIMES,
  BOGO_CHOICES,
  COUPON_TYPES,
  CUSTOMER_PROFILE_MODULES,
  CUSTOMER_REWARD_TYPES,
  CUSTOMER_REWARD_TYPES_IMG_URLS,
  ORDER_DELIVERY_TYPES,
  DAYS_IN_A_WEEK,
  DATE_FORMAT,
  DEFAULT_TIMEZONE,
  MAX_SUB_NAVBAR_ITEMS,
  MENUS_MANAGEMENT_NAVBAR_ITEMS,
  MOBILE_NAVBAR_ITEMS,
  MONTHS,
  NEW_ITEM_FIELDS,
  ORDERS_NAVBAR_ITEMS,
  PAYMENT_WALLET_OPTIONS,
  PREPARATION_SUBNAV_ITEMS,
  REGEX,
  TEST_SHOP_IDS,
  TIME_FORMAT,
  TIME_RANGE_OPTIONS,
  TEST_RECEIPT: TestReceipt,
};
