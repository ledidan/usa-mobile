import React from "react";
import { View, Text } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const Strong = props => {
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: responsiveFontSize(1),
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
};

export default Strong;
