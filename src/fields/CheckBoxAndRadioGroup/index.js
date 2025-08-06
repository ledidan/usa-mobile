import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Radio, Checkbox } from "react-native-paper";

//Style
import Style from "./style";

export class index extends Component {
  onClickOption = optionId => {
    const { onClick, readOnly = false } = this.props;
    if (onClick && !readOnly) onClick(optionId);
  };
  renderCheckBox = ({ props = {} }) => {
    return;
  };
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default index;
