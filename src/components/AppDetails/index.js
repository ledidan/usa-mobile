import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "lib/Constants";

const { APP_DETAILS_INFO } = Constants;
const AppDetails = ({ showInCard = true }) => {
  const generalFields = APP_DETAILS_INFO.slice(0, 4);
  const merchantSupportFields = APP_DETAILS_INFO.slice(4, 6);
  const customerSupportFields = APP_DETAILS_INFO.slice(6, 8);
  return (
    <View style={showInCard && Style.card}>
      <Text style={Style.sectionTitle}>App Details</Text>

      {/* General App Info */}
      {generalFields.map(item => {
        return (
          <View key={item.id} style={[Style.infoRow]}>
            <Text style={Style.label}>{item.label}</Text>
            <Text style={Style.value}>{item.value}</Text>
          </View>
        );
      })}

      {/* Merchant Support Info */}
      <View style={[Style.infoRow]}>
        <Text style={Style.label}>Merchant Support</Text>
        <Text style={[Style.value, { textAlign: "right" }]}>
          {merchantSupportFields.map(item => `${item.value}`).join("\n")}
        </Text>
      </View>

      {/* Customer Support Info */}
      <View style={[Style.infoRow, { borderBottomWidth: 0 }]}>
        <Text style={Style.label}>Customer Support</Text>
        <Text style={[Style.value, { textAlign: "right" }]}>
          {customerSupportFields.map(item => `${item.value}`).join("\n")}
        </Text>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  card: {
    width: "65%",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d4dae0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});

export default AppDetails;
