import { StyleSheet } from "react-native";
import { fontSize, textColor, lineHeight } from "../style";
const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  previewInfo: {
    flexDirection: "row",
    marginBottom: 5,
  },
  category: {
    flexDirection: "row",
    marginRight: 15,
  },
  label: { fontSize, color: textColor, lineHeight },
  desc: { fontSize, fontWeight: "bold", color: textColor, lineHeight },
});

export default styles;
