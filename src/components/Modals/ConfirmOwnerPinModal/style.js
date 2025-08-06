import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  modalContainer: { marginHorizontal: "25%", height: "45%" },
  contentContainer: {
    paddingBottom: responsiveHeight(0.2),
    
  },
  textInput: {
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  btn: {
    height: responsiveHeight(7),
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  btnLabel: {
    fontSize: responsiveFontSize(1),
    height: "100%",
    textAlignVertical: "center",
  },
});

export default styles;
