import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default class InfoInputRow extends Component {
  render() {
    const { label = "", value = "", style: customStyle = {} } = this.props;
    return (
      <View style={[Style.infoRow, customStyle]}>
        <Text style={Style.label}>{label}</Text>
        <TextInput
          style={Style.input}
          value={value}
          editable={false}
          placeholder="-"
          placeholderTextColor="#999"
          multiline
        />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  infoRow: {
    width: "48%",
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    backgroundColor: "#f7f9fc",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
  },
});
