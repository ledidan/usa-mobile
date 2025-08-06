import { StyleSheet, Dimensions } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const margin = responsiveWidth(0.5);
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    width: responsiveWidth(30),
    flexGrow: 1,
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(3),
  },

  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    alignSelf: "stretch",
    marginBottom: responsiveHeight(5),
    marginTop: responsiveHeight(1),
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2.5),
  },

  storeInfoContainer: {},

  storeInfoText: {
    fontSize: responsiveWidth(1.8),
    fontWeight: "bold",
  },

  closeBtnWrapper: {
    alignItems: "flex-end",
  },

  closeBtn: {
    height: responsiveHeight(5),
    width: responsiveHeight(5), // Cho vuông, thay vì responsiveWidth
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
export default styles;
