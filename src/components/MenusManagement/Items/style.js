import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const styles = StyleSheet.create({
  chipDescription: {
    flexDirection: "row",
    alignItems: "center",
    textTransform: "capitalize",
  },
  itemPrice: { fontSize: responsiveFontSize(0.8) },
  marginRight: { marginRight: responsiveWidth(1) },
});
export default styles;
