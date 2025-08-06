// BUTI DINERS, INC. All right Reserved ©

// Lib
import { FOOD_PREFERENCES } from "./FoodPreferences";
import REGEX from "./RegEx";

const BUTI_EMAIL_ADDRESSES = ["info@buti.io", "joeygonzalesdones@gatech.edu"];

const OWNER_INFO_FIELDS = [
  "ownerName",
  "lastFourDigitsOfSSN",
  "dob",
  "ownerMobileNumber",
  "businessWebsite",
];

const CHECKING_ACCOUNT_FIELDS = [
  "businessName",
  "accountNumber",
  "routingNumber",
  "federalTaxID",
];

const COUPON_INFO_SECTION = [
  {
    id: "couponInfo",
    name: "Coupon Information",
    fields: [
      {
        fieldKind: "text",
        id: "name",
        label: "Name",
        required: true,
      },
      {
        fieldKind: "text",
        id: "description",
        label: "Description",
        required: false,
      },
    ],
  },
];

const CUSTOMER_TIPPING_OPTIONS = {
  option1: {
    label: "15%",
    multiplier: 0.15,
  },
  option2: {
    label: "20%",
    multiplier: 0.2,
  },
  option3: {
    label: "30%",
    multiplier: 0.3,
  },
  other: { label: "😭" },
};

const AVERAGE_PREPARATION_TIMES = {
  timeRange1: {
    label: "10 - 20 mins",
  },
  timeRange2: {
    label: "20 - 40 mins",
  },
  timeRange3: {
    label: "> 40 mins",
  },

};

const OPPORTUNITIES = [
  {
    id: "softwareEngineer",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/buti-sheryl-angel.appspot.com/o/BUTI%2FSoftware%20Gray.svg?alt=media&token=2fe6a8ca-6649-435e-a6a0-d84f52067642",
    name: "Software Engineer",
    description:
      "Be the next rockstar developer and build amazing products used by billions",
    details: [
      {
        name: "Tech Stack",
        description: "React, Express.js, ElasticSearch and growing",
      },
      {
        name: "Responsibility",
        description: "You will involve in every engineering aspect",
      },
      {
        name: "Expectation",
        description: "Build something you want your family to use",
      },
    ],
  },
  {
    id: "influencer",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/buti-sheryl-angel.appspot.com/o/BUTI%2FInfluencer%20Gray.svg?alt=media&token=e67bcf88-a0da-4c54-a220-fc8a494b7705",
    name: "Influencer",
    description:
      "Be the great influencer you meant to be and enlist people in our revolution",
    details: [
      {
        name: "Tools",
        description: "GTrends, Instagram, Facebook and growing",
      },
      {
        name: "Responsibility",
        description: "You will involve in every marketing aspect",
      },
      {
        name: "Expectation",
        description: "Spread the word for something you love",
      },
    ],
  },
];

const MERCHANT_GET_PAID_FORM = {
  businessName: {
    label: "Legal Business Name",
    placeholder: "Good Company LLC",
    required: true,
  },
  accountNumber: {
    label: "Bank Account Number",
    required: true,
    type: "number",
  },
  routingNumber: {
    label: "Routing Number",
    required: true,
    type: "number",
  },
  federalTaxID: {
    label: "Federal Tax ID (or SSN)",
    required: true,
    type: "number",
  },
  ownerName: {
    label: "Name Of Owner",
    required: true,
  },
  lastFourDigitsOfSSN: {
    label: "Last 4 digits of SSN",
    placeholder: "0000",
    required: true,
    regEx: REGEX.LAST_FOUR_DIGITS_OF_SSN,
    type: "number",
  },
  dob: {
    label: "Date Of Birth",
    placeholder: "MM/DD/YYYY",
    regEx: REGEX.DATE_OF_BIRTH,
    required: true,
  },
  ownerMobileNumber: {
    label: "Mobile Number",
    regEx: REGEX.US_PHONE_NUMBER,
    required: true,
    type: "number",
  },
  businessWebsite: {
    label: "Business Website",
    regEx: REGEX.WEBSITE,
  },
};

// ---------------------------------------------------------------------
// Form fields for creating a new group
const NEW_GROUP_FIELDS = [
  {
    fieldKind: "text",
    id: "groupName",
    label: "Name",
    placeholder: "What to call the group",
    required: true,
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new item

const GetAllergens = () => {
  const { options } = FOOD_PREFERENCES.find(({ id }) => id === "allergies");
  return options || {};
};

// ---------------------------------------------------------------------
// Form fields for creating new items

const NEW_ITEM_FIELDS = [
  {
    fieldKind: "text",
    id: "itemName",
    label: "Name",
    placeholder: "What to call the item",
    required: true,
  },
  {
    fieldKind: "text",
    id: "itemPrice",
    label: "Price ($)",
    type: "number",
  },
  {
    fieldKind: "text",
    id: "itemKitchenChitName",
    label: "Kitchen Chit Name",
  },
  {
    fieldKind: "switch",
    id: "itemIsOutOfStock",
    label: "Item out of stock?",
    options: {
      false: { label: "No" },
      true: { label: "Yes" },
    },
    required: true,
  },
  {
    fieldKind: "switch",
    id: "itemIsOnSale",
    label: "Item is on sale?",
    options: {
      false: { label: "No" },
      true: { label: "Yes" },
    },
    readOnly: true,
  },
  {
    fieldKind: "text",
    id: "itemSaleRate",
    label: "Sale Rate (%)",
    min: "0",
    max: "99",
    placeholder: "5%",
    type: "number",
    unit: "%",
  },
  {
    fieldKind: "textarea",
    id: "itemDescription",
    label: "Description",
    placeholder: "Say something cool about the item",
    rows: 3,
  },
  {
    fieldKind: "text",
    id: "itemCalories",
    label: "Calories",
    placeholder: "100",
    type: "number",
  },
  {
    fieldKind: "checkboxes",
    id: "itemAllergens",
    label: "Allergens",
    options: GetAllergens(),
  },
  {
    fieldKind: "textarea",
    id: "itemNote",
    label: "Note For Customers",
    rows: 5,
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new menu

const NEW_MENU_FIELDS = [
  {
    fieldKind: "text",
    id: "menuName",
    label: "Name",
    placeholder: "What to call the menu",
    required: true,
  },
  {
    fieldKind: "radio",
    id: "isMenuForCatering",
    label: "Menu is for catering",
    options: {
      true: { label: "Yes" },
      false: { label: "No" },
    },
    required: true,
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new modifier
const NEW_MODIFIER_FIELDS = [
  {
    fieldKind: "text",
    id: "modifierName",
    label: "Name",
    placeholder: "What to call the modifier",
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierKitchenChitName",
    label: "Kitchen Chit Name",
  },
  {
    fieldKind: "textarea",
    id: "modifierDescription",
    label: "Description",
    placeholder: "Anything you want the customer to know about this modifier",
    rows: 2,
  },
  {
    fieldKind: "text",
    id: "modifierPrice",
    label: "Price ($)",
    type: "number",
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new modifier group

const NEW_MODIFIER_GROUP_FIELDS = [
  {
    fieldKind: "text",
    id: "modifierGroupName",
    label: "Name",
    placeholder: "What to call the modifier group",
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierGroupNote",
    label: "Note",
  },
  {
    fieldKind: "radio",
    id: "modifierGroupIsRequired",
    label: "Require customers to select an option?",
    options: {
      true: { label: "Yes" },
      false: { label: "No" },
    },
    required: true,
  },
  {
    fieldKind: "radio",
    id: "modifierGroupAllowMultipleChoices",
    label: "Customer can select more than one option?",
    options: {
      true: { label: "Yes" },
      false: { label: "No" },
    },
    required: true,
  },
  {
    fieldKind: "text",
    id: "modifierGroupMaxChoices",
    label: "Maximum Choices",
    type: "number",
  },
  {
    fieldKind: "text",
    id: "modifierGroupMinChoices",
    label: "Minimum Choices",
    min: 0,
    type: "number",
  },
];

// ---------------------------------------------------------------------
// Form fields for creating new debit card for diners

const NEW_PAYMENT_CARD_FIELDS = {
  email: {
    fieldKind: "text",
    placeholder: "Email",
    regEx: REGEX.EMAIL,
    type: "email",
    required: true,
  },
  // country: {
  //   fieldKind: "text",
  //   value: "United States",
  //   readOnly: true
  // },
  // line1: {
  //   fieldKind: "text",
  //   placeholder: "Address Line 1",
  //   required: true
  // },
  // line2: {
  //   fieldKind: "text",
  //   placeholder: "Address Line 2"
  // },
  // city: {
  //   fieldKind: "text",
  //   placeholder: "City",
  //   required: true
  // },
  // state: {
  //   fieldKind: "text",
  //   placeholder: "State (GA)",
  //   regEx: REGEX.US_STATES,
  //   required: true
  // },
  // postal_code: {
  //   fieldKind: "text",
  //   placeholder: "Zip",
  //   regEx: REGEX.POSTAL_CODE,
  //   required: true
  // }
};

const QUICK_REPORT_TEMPLATE = {
  inStore: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
  pickUp: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
  deliver: {
    subTotalPlusTax: 0,
    subTotal: 0,
    totalDeliverFee: 0,
    totalItemsCount: 0,
    totalMerchantFee: 0,
    totalOrdersCount: 0,
    totalTipAmount: 0,
  },
};

const SALES_REPORT_FILTER_OPTIONS = {
  pastWeek: {
    label: "1w",
  },
  pastFourWeeks: {
    label: "4w",
  },
  pastYear: {
    label: "1y",
  },
  monthToDate: {
    label: "Mtd",
  },
  quarterToDate: {
    label: "Qtd",
  },
  yearToDate: {
    label: "Ytd",
  },
  all: {
    label: "All",
  },
};

const SHOP_INFO_SECTIONS = [
  {
    id: "basicInfo",
    name: "Basic Information",
    fields: [
      {
        fieldKind: "text",
        id: "name",
        label: "Shop Name",
        placeholder: "Name of your shop",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "shopId",
        label: "Shop Id",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "address",
        label: "Address",
        placeholder: "Address of your shop",
        required: true,
        readOnly: true,
      },
      {
        fieldKind: "text",
        id: "salesTax",
        label: "Sales Tax (%)",
        placeholder: "7.50",
        readOnly: true,
        required: true,
        type: "number",
      },
      {
        fieldKind: "text",
        id: "phoneNumber",
        label: "Phone Number",
      },
      {
        fieldKind: "text",
        id: "timeZone",
        label: "Time Zone",
        readOnly: true,
      },
    ],
  },
  {
    id: "mobilePayment",
    name: "Customer Payment",
    fields: [
      {
        fieldKind: "switch",
        id: "enableMobilePay",
        label: "Enable Mobile Pay",
      },
    ],
  },
];

export {
  AVERAGE_PREPARATION_TIMES,
  BUTI_EMAIL_ADDRESSES,
  CHECKING_ACCOUNT_FIELDS,
  COUPON_INFO_SECTION,
  CUSTOMER_TIPPING_OPTIONS,
  QUICK_REPORT_TEMPLATE,
  MERCHANT_GET_PAID_FORM,
  NEW_GROUP_FIELDS,
  NEW_ITEM_FIELDS,
  NEW_MENU_FIELDS,
  NEW_MODIFIER_FIELDS,
  NEW_MODIFIER_GROUP_FIELDS,
  NEW_PAYMENT_CARD_FIELDS,
  OPPORTUNITIES,
  OWNER_INFO_FIELDS,
  SALES_REPORT_FILTER_OPTIONS,
  SHOP_INFO_SECTIONS,
};
