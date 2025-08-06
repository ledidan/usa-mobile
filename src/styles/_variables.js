import { Dimensions } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const { width } = Dimensions.get("window");

const isSmallScreen = width < 864 ? true : false;
const global_border_radius = 10;
const skipli_red_color = "#ef5155";

//Colors
const intro_background = "#f5fdf9";

const primary = "#006AFF";
const primary_light = "#def2f1";
const primary_lightest = "#f2ffff";

const black = "#000";
const black_light = "#0b2135";
const white = "#fff";
const yellow = "#ffc555";

const border_color = "#e0e5fd";
const border_color_dark = "#d4dae0";

// Text
const text_color = "#000";
const text_color_light = "#222222";
const text_color_alt = "#051146";
const text_color_alt_light = "#26305d";

const info = "#006AFF";
const danger = "#fd5458";
const success = primary;
const warning = "#ffa055";
const grey = "#f4f5f6";
const dark_grey = "#525f7f";
const grey_medium = "#586271";

const secondary = "#ffa055";
const secondary_dark = "#fc8c32";
const signText = {
  textAlignVertical: "center",
  textTransform: "uppercase",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: responsiveFontSize(0.8),
  paddingHorizontal: responsiveWidth(0.5),
  paddingVertical: responsiveHeight(0.2),
  marginLeft: responsiveWidth(1),
  borderRadius: 5,
  borderWidth: 1,
  color: "#fff",
};
const requireText = {
  ...signText,
  backgroundColor: primary,
  borderColor: primary,
};
const optionText = {
  ...signText,
  backgroundColor: grey,
  borderColor: grey,
  color: "#000",
  fontWeight: "normal",
};

//https://reactnative.dev/docs/easing - from Transition Animation require Animated

export default {
  black,
  black_light,
  border_color,
  border_color_dark,
  danger,
  dark_grey,
  global_border_radius,
  grey,
  grey_medium,
  info,
  intro_background,
  isSmallScreen,
  primary,
  primary_light,
  primary_lightest,
  secondary,
  secondary_dark,
  success,
  skipli_red_color,
  text_color,
  text_color_alt,
  text_color_alt_light,
  text_color_light,
  requireText,
  optionText,
  white,
  yellow,
  warning,
};
