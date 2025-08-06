import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
// Style
import colors from "styles/_variables";

const StoreID = ({ shopId = "" }) => {
  return (
    <View>
      <View style={Style.textRow}>
        <Text style={Style.storeLabel}>Store</Text>
        <Text style={Style.storeIdText} numberOfLines={1} ellipsizeMode="tail">
          {" "}
          #{shopId}
        </Text>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginVertical: 2,
  },
  storeLabel: {
    color: colors.grey_medium,
    fontWeight: "700",
    fontSize: responsiveFontSize(1.1),
  },
  storeIdText: {
    color: colors.grey_medium,
    fontWeight: "700",
    fontSize: responsiveFontSize(1.1),
    flexShrink: 1,
    marginRight: 8,
  },
});

export default StoreID;
