const YOUR_STORE_SECTIONS = {
  basicInfo: {
    title: "Basic Information",
    subtitle:
      "Please email accounts@skiplinow.com for any changes to the basic information",
    fields: [
      {
        id: "name",
        label: "Shop Name",
      },
      {
        id: "id",
        label: "Shop ID",
      },
      {
        id: "address",
        label: "Address",
      },
      {
        id: "salesTax",
        label: "Sales Tax (%)",
      },
      {
        id: "phoneNumber",
        label: "Phone Number",
      },
      {
        id: "timeZone",
        label: "Time Zone",
      },
    ],
  },
  newOrdersNotification: {
    title: "New Orders Notification",
    subtitle: "New orders will be texted to these phone numbers",
  },
};

export { YOUR_STORE_SECTIONS };
