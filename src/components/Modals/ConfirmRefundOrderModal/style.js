import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  modal: {
    maxHeight: responsiveHeight(90),
    marginHorizontal: responsiveWidth(10),
  },
  contentDescText: {
    fontSize: responsiveFontSize(1),
  },
});
export default styles;
