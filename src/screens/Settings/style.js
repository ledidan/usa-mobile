import { fontSize } from "components/Orders/ShopOrders/ShopOrdersPill/style";
import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import colors from "styles/_variables";
const cardMargin = responsiveHeight(2.5);
const cardPadding = responsiveHeight(3.5);
const btn = {
  height: responsiveHeight(5.5),
  justifyContent: "center",
  fontSize: 20,
};
const style = StyleSheet.create({
  container: { paddingHorizontal: 20, flexGrow: 1 },
  cardContainer: {
    margin: cardMargin,
    borderRadius: 10,
    elevation: 4,
    padding: cardPadding,
  },
  header: { flexDirection: "row" },
  headerText: { fontSize: responsiveFontSize(1.8), fontWeight: "bold" },
  underline: {
    paddingBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  switchLabel: {
    fontSize: responsiveFontSize(1.2),
    color: "black",
    marginHorizontal: 8,
  },

  activeSwitchLabel: {
    color: colors.primary,
    fontWeight: "bold",
  },

  activeText: { color: colors.primary },
  settingDesc: {
    width: "60%",
    marginVertical: responsiveHeight(2.5),
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(2),
  },
  testBtn: {
    ...btn,
    alignSelf: "flex-start",
  },
  btnLabel: {
    height: "100%",
    textAlignVertical: "center",
    fontSize: responsiveFontSize(1),
  },
  stop: { backgroundColor: colors.secondary },
  description_containter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: responsiveWidth(72),
  },
  switchRowPrinter: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  printerHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  printerBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  printerBtnHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },
  printerBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  printerBtnRefresh: {
    ...btn,
    marginRight: "3%",
  },
  printerBtn: {
    ...btn,
  },
  addedPrintersContainer: {
    marginTop: responsiveHeight(3),
    flexWrap: "wrap",
    flexDirection: "row",
    width: responsiveWidth(80),
  },
  noPrinter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
  },
  printerContent: {
    marginBottom: responsiveHeight(2),
    marginRight: responsiveHeight(2),
    paddingVertical: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.grey,
    borderRadius: 10,
    width: responsiveWidth(35),
  },
  ultiBtnContainer: {
    flexDirection: "row",
    marginTop: responsiveHeight(0.5),
    flexWrap: "wrap",
  },
  editBtn: {
    color: "white",
    marginRight: responsiveWidth(1.5),
    marginTop: responsiveHeight(1),
    ...btn,
  },
  editBtnLabel: {
    height: "100%",
    textAlignVertical: "center",
    fontSize: responsiveFontSize(0.9),
  },
  removeBtn: {
    position: "absolute",
    top: responsiveHeight(0.5),
    right: responsiveWidth(0.5),
  },
  printerLogo: {
    width: responsiveWidth(6),
    height: responsiveHeight(4),
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  printerName: {
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(2),
    fontWeight: "bold",
    justifyContent: "center",
  },
  printerInfoContent: {
    flexDirection: "row",
    marginTop: responsiveWidth(1.5),
    marginBottom: responsiveHeight(0.5),
    alignItems: "center",
  },
  printerInfo: {
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(2),
    marginRight: responsiveWidth(1.5),
  },
  printerOff: {
    alignSelf: "center",
    color: colors.secondary_dark,
  },
  fab: {
    position: "absolute",
    right: 10,
    bottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: colors.primary,
  },
});

export default style;
