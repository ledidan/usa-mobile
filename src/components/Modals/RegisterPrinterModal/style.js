import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "styles/_variables";
const { width } = Dimensions.get("window");
const container = {
  flexDirection: "row",
  justifyContent: "space-evenly",
};
const btn = {
  height: responsiveHeight(6.5),
  justifyContent: "center",
  alignItems: "center",
  marginRight: 20,
  elevation: 5,
  borderColor: colors.primary,
  borderWidth: responsiveWidth(0.2),
};
const styles = StyleSheet.create({
  modalContentContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    flex: 1,
  },
  viewContainer: {
    width,
    flexGrow: 1,
    padding: responsiveWidth(2.5),
    paddingBottom: responsiveHeight(2),
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(0.8),
  },
  title: {
    fontSize: responsiveFontSize(1.25),
    fontWeight: "bold",
    marginRight: responsiveWidth(1.3),
  },
  optionContent: { flexDirection: "row", alignItems: "center" },
  optionLabel: {
    fontSize: responsiveFontSize(1.2),
    marginRight: responsiveWidth(1.4),
  },
  connectTypeOptions: { alignSelf: "flex-start", marginBottom: 20 },
  printerContainer: {
    ...container,
  },
  printerContentContainer: {
    width: responsiveWidth(60),
  },
  notice: {
    paddingVertical: responsiveScreenHeight(1.5),
    fontSize: responsiveFontSize(0.8),
    paddingLeft: 0,
  },
  inputField: {
    width: "60%",
    marginTop: responsiveHeight(2),
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: responsiveHeight(4),
  },
  // dropdown
  // dropdown: {
  //   height: 25,
  //   borderBottomColor: "gray",
  //   borderBottomWidth: 0.5,
  //   width: responsiveWidth(18),
  //   justifyContent: "flex-start",
  // },
  // containerStyle: {
  //   borderRadius: 10,
  // },
  // itemStyle: {
  //   fontSize: responsiveFontSize(1.2),
  // },
  // placeholderStyle: {
  //   fontSize: responsiveFontSize(1.2),
  // },
  // selectedTextStyle: {
  //   fontSize: responsiveFontSize(1.2),
  // },
  container: {
    backgroundColor: "white",
    paddingTop: 10,
    zIndex: 1000,
  },
  containerStyle: {
    borderRadius: 10,
  },

  label: {
    color: "#757575",
    position: "absolute",
    backgroundColor: "#fff",
    left: 6.5,
    top: 2,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: responsiveFontSize(1.2),
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(1.2),
    color: "#757575",
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.2),
    color: "black",
  },
  itemStyle: {
    fontSize: responsiveFontSize(1.2),
  },
  // dropdown end
  button: {
    ...btn,
  },
  btnLabel: {
    height: responsiveHeight(6.5),
    fontSize: responsiveFontSize(1),
    textAlignVertical: "center",
  },
  cancelLabel: { color: colors.primary },
  msgContainer: {
    paddingVertical: "5%",
    alignItems: "center",
  },
  msgHeadline: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveFontSize(2.2),
  },
  msgTitle: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
  },
  btnSettings: {
    ...btn,
    alignSelf: "flex-start",
  },
  backBtn: {
    alignSelf: "flex-start",
    marginVertical: responsiveHeight(1.6),
    marginLeft: responsiveWidth(4.5),
  },

  blePrinterOptions: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: responsiveHeight(2),
  },
  printerOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: responsiveWidth(1),
    marginBottom: responsiveHeight(1),
    width: responsiveWidth(25),
  },
  printerContent: {
    alignItems: "center",
    backgroundColor: colors.grey,
    borderRadius: 10,
    color: "#fff",
    flexDirection: "row",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2.5),
  },
  blePrinter: { marginLeft: 20 },
  printerName: {
    fontWeight: "bold",
    lineHeight: responsiveFontSize(1.6),
    fontSize: responsiveFontSize(1),
  },
  printerMacAddr: {
    lineHeight: responsiveFontSize(1.4),
    fontSize: responsiveFontSize(0.8),
  },
  helperText: {
    marginVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(1.2),
  },
  wrapper: {
    marginBottom: responsiveHeight(1),
    width: responsiveWidth(36),

  },
  dropdown: {
    height: responsiveHeight(10),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(1.5),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    width: responsiveWidth(36),
  },
  dropdownOpen: {
    borderColor: "#007AFF",
  },
  placeholderText: {
    fontSize: responsiveFontSize(1.2),
    color: "#999",
  },
  selectedText: {
    fontSize: responsiveFontSize(1.2),
    color: "#000",
  },
  optionContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: responsiveHeight(30),
    overflow: "hidden",
  },
  optionItem: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(3),
  },
  selectedItem: {
    backgroundColor: "#f0f8ff",
  },
  optionText: {
    fontSize: responsiveFontSize(1.2),
    color: "#000",
  },
  selectedTextColor: {
    color: "#007AFF",
    fontWeight: "600",
  },
  label: {
    fontSize: responsiveFontSize(1),
    color: "#333",
    marginBottom: responsiveHeight(0.5),
  },
});
export default styles;
