import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
const styles = StyleSheet.create({
  errorText: {
    fontSize: responsiveFontSize(0.7),
    lineHeight: responsiveFontSize(1.2),
    marginVertical: responsiveHeight(0.4),
  },
  modalTitle: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: "bold",
    lineHeight: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(1.2),
  },
});

export default styles;
