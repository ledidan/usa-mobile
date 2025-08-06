import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { fontSize } from "../style";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    minWidth: responsiveWidth(40),
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(6.5),
    width: responsiveWidth(11),
    elevation: 10,
    marginRight: "4%",
  },
  btnLabel: {
    fontSize: responsiveFontSize(0.8),
    height: "100%",
    textAlignVertical: "center",
  },
});
export default styles;
