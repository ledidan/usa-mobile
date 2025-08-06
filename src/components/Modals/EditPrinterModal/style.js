import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "styles/_variables";
const section = { flexDirection: "row" };
const styles = StyleSheet.create({
  printer: {
    padding: responsiveWidth(1.5),
    height: responsiveHeight(80),
  },
  headerSection: {
    ...section,
    alignItems: "center",
    marginBottom: responsiveHeight(1.5),
    justifyContent: "space-between",
  },
  printerName: {
    // fontSize: responsiveFontSize(1.2),
    // lineHeight: responsiveFontSize(1.4),
    // height: responsiveHeight(7),
    // width: "100%",
    // marginLeft: responsiveWidth(1.5),
    marginTop: 10,
    backgroundColor: "#fff",
    marginBottom: responsiveWidth(1.5),
  },
  description: { ...section, marginBottom: responsiveHeight(1) },
  title: { fontSize: responsiveFontSize(1.2) },
  requireLabel: {
    ...colors.requireText,
  },
  brands: { marginBottom: responsiveHeight(1.5) },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandText: {
    marginLeft: responsiveWidth(0.8),
    textAlignVertical: "center",
    fontSize: responsiveFontSize(1.4),
  },
  brandImage: {
    marginLeft: responsiveWidth(0.8),
    width: responsiveWidth(6),
    height: responsiveHeight(5),
    resizeMode: "contain",
  },
  bleBrandText: {
    // styling for Printer Brand for EditPrinterModal component
    marginLeft: responsiveWidth(0.8),
    marginBottom: responsiveWidth(1.5),
    //text
    textAlignVertical: "center",
    fontSize: responsiveFontSize(1.4),
  },
  bleBrandImage: {
    // styling for Printer Brand for EditPrinterModal component
    marginLeft: responsiveWidth(0.8),
    marginBottom: responsiveWidth(1.5),
    //image
    width: responsiveWidth(8),
    height: responsiveHeight(5),
    resizeMode: "contain",
  },
  testButton: {
    width: responsiveWidth(20),
    height: responsiveHeight(6.5),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnLabel: {
    fontSize: responsiveFontSize(1),
    height: "100%",
    textAlignVertical: "center",
  },
  indicator: { marginVertical: responsiveHeight(5), alignSelf: "center" },

  buttonContainer: { paddingHorizontal: responsiveWidth(2.5) },
  button: {
    height: responsiveHeight(7.5),
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
  },
  updateLabel: {
    fontSize: responsiveFontSize(1.2),
    height: "100%",
    width: "100%",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  //dropdown menu
  container: {
    backgroundColor: "white",
    paddingTop: 10,
  },
  containerStyle: {
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
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
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.2),
  },
  itemStyle: {
    fontSize: responsiveFontSize(1.2),
  },
  wrapper: {
    marginBottom: responsiveHeight(2),
  },
  dropdown: {
    height: responsiveHeight(10),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(1.5),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
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
    marginTop: 8,
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

  //end dropdown menu
});
export default styles;
