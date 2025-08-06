import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "styles/_variables";
const fontSize = responsiveFontSize(1);
const itemPaddingVertical = responsiveHeight(1.2);
const itemPaddingHorizontal = responsiveWidth(1);
const itemborderWidth = 1;
const itemborderRadius = 10;
const itemElevation = 2;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  elementContainer: {
    marginRight: responsiveHeight(2),
    marginBottom: responsiveHeight(0.5),
    marginLeft: 0,
  },
  expandOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: colors.border_color_dark,
    borderWidth: itemborderWidth,
    borderRadius: itemborderRadius,
    elevation: itemElevation,
    color: colors.text_color,
    paddingVertical: itemPaddingVertical,
    paddingHorizontal: responsiveWidth(1.6),
    textAlign: "center",
  },
  btnLabel: {
    fontSize: fontSize,
    fontWeight: "700",
    color: colors.primary,
  },
  btnIcon: {
    marginRight: 5,
    color: colors.primary,

  },
});
export const item = {
  fontSize,
  itemPaddingVertical,
  itemPaddingHorizontal,
  itemborderRadius,
  itemborderWidth,
  itemElevation,
};
export default styles;
