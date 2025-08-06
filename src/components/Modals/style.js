import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
const styles = StyleSheet.create({
  radioForm: {
    marginBottom: responsiveHeight(1.5),
  },
  formField: { marginBottom: responsiveHeight(2.5) },
  inputField: {
    color: "black",
  },
  textArea: {
    lineHeight: responsiveFontSize(1.8),
  },
});

export default styles;
