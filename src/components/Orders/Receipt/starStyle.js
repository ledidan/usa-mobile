import { StyleSheet, PixelRatio } from "react-native";

/**NOTE:
 * Pixel Desity (dp)
 * Pixel Ratio (pr) - device pixel density https://reactnative.dev/docs/pixelratio#get
 * Actual Pixel (pixel)
 * dp * pr = pixel
 * Thus 1 dp = pixel / pr
 */
//target ActualPixel = 210px
//PixelRatio = PixelRatio.get()
//PixelDensity require = Target / PixelRatio
//PixelRatio.getPixelSizeForLayoutSize(140) === 210 px

/**
 * Image width in px
 * 384px for 2" thermal printers
 * 210px for 3" dot matrix printers
 * 576px for 3" thermal printers
 * 832px for 4" thermal printers
 */
const fontFamily = "serif";
const one_px = 1 / PixelRatio.get();
const widthStar = PixelRatio.getPixelSizeForLayoutSize(210 * one_px);
const style = StyleSheet.create({
  viewShotContainer: {
    width: widthStar,
    maxWidth: widthStar,
    backgroundColor: "#fff",
    //hide the receipt content
    //to display the receipt content for debugging comment the below twoline
    position: "absolute",
    right: -1000,
  },
  contentContainer: {
    // paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(3 * one_px),
    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(3 * one_px),
  },
  skipli: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(19 * one_px),
    fontFamily,
  },
  alignTextCenter: { textAlign: "center" },
  deliveryType: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(13 * one_px),
    fontFamily,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: widthStar,
  },
  OrderDetails: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(11 * one_px),
    fontFamily,
  },

  itemStyle: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(12 * one_px),
    fontFamily,
    textAlignVertical: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  caption: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(12 * one_px),
    lineHeight: PixelRatio.getPixelSizeForLayoutSize(11 * one_px),
  },
});

export default style;
