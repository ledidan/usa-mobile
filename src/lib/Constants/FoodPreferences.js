// BUTI Corp All right Reserved ©
// Son That Ton
// john@buti.io

import React from "react";
import {
  DairyIcon,
  EggIcon,
  GlutenIcon,
  NutIcon,
  PorkIcon,
  SeafoodIcon,
  SesameIcon,
  ShellIcon,
  SoyIcon,
} from "assets/Icons";

const FOOD_PREFERENCES = [
  {
    id: "allergies",
    label: "food allergies",
    description: "Select all allergies that apply",
    options: {
      dairy: {
        label: "Dairy",
        colorCode: "#6fa9d4",
        icon: <DairyIcon />,
        optionType: "label",
      },
      egg: {
        label: "Egg",
        colorCode: "#6fa9d4",
        icon: <EggIcon />,
        optionType: "label",
      },
      gluten: {
        label: "Gluten",
        colorCode: "#fbc97a",
        icon: <GlutenIcon />,
        optionType: "label",
      },
      nut: {
        label: "Nut",
        colorCode: "#fd9126",
        icon: <NutIcon />,
        optionType: "label",
      },
      pork: {
        label: "Pork",
        colorCode: "#fd9126",
        icon: <PorkIcon />,
        optionType: "label",
      },
      soy: {
        label: "Soy",
        colorCode: "#d8e163",
        icon: <SoyIcon />,
        optionType: "label",
      },
      seafood: {
        label: "Seafood",
        colorCode: "#6fa9d4",
        icon: <SeafoodIcon />,
        optionType: "label",
      },
      shell: {
        label: "Shell",
        colorCode: "#4d4d4d",
        icon: <ShellIcon />,
        optionType: "label",
      },
      sesame: {
        label: "Sesame",
        colorCode: "#c59b70",
        icon: <SesameIcon />,
        optionType: "label",
      },
    },
  },
  {
    id: "dietaryRestrictions",
    label: "Dietary Restrictions",
    description: "Select all restrictions that apply",
    options: [
      {
        id: "glutenFree",
        label: "Gluten Free",
        description:
          "A diet that strictly excludes gluten, a mixture of proteins found in wheat and related grains.",
        optionType: "switch",
        isSelected: false,
      },
      {
        id: "vegan",
        label: "Vegan",
        description:
          "A diet that only premits vegetables and plant-based products.",
        optionType: "switch",
        isSelected: false,
      },
      {
        id: "vegetarian",
        label: "Vegetarian",
        description:
          "Don't eat animals, but may eat products that come from them (such as dairy and eggs).",
        optionType: "switch",
        isSelected: false,
      },
      {
        id: "kosher",
        label: "Kosher",
        description:
          "Foods conform to the Jewish dietary regulations of kashrut.",
        optionType: "switch",
        isSelected: false,
      },
      {
        id: "halal",
        label: "Halal",
        description: "Foods permissible according to Islamic law.",
        optionType: "switch",
        isSelected: false,
      },
    ],
  },
  // {
  //   id: "spiciness",
  //   label: "spiciness",
  //   description: "Select how spicy you can handle",
  //   options: [
  //     {
  //       id: 1,
  //       label: "Nah",
  //       imgUrl: "",
  //       optionType: "label",
  //       isSelected: true
  //     },
  //     { id: 2, imgUrl: "", optionType: "label", isSelected: false },
  //     {
  //       id: 3,
  //       label: "Mild",
  //       imgUrl: "",
  //       optionType: "label",
  //       isSelected: false
  //     },
  //     { id: 4, imgUrl: "", optionType: "label", isSelected: false },
  //     {
  //       id: 5,
  //       label: "super",
  //       imgUrl: "",
  //       optionType: "label",
  //       isSelected: false
  //     }
  //   ]
  // },
];

const DIETARY_RESTRICTIONS = [
  {
    id: "kosher",
    label: "kosher",
  },
  {
    id: "halal",
    label: "halal",
  },
  {
    id: "vegan",
    label: "vegan",
  },
  {
    id: "gluten_free",
    label: "gluten free",
  },
  {
    id: "vegetarian",
    label: "vegetarian",
  },
];

export { DIETARY_RESTRICTIONS, FOOD_PREFERENCES };
