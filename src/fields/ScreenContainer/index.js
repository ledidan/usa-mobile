import React, { Component } from "react";
import { View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class ScreenContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1, padding: responsiveWidth(2) }}>
        {this.props.children}
      </View>
    );
  }
}

export default ScreenContainer;
