import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

// Utils
import { _roundNumber } from "utils";

//Style
import Style from "./style";
export class Modifiers extends Component {
  renderModifiers = (modifiers = {}) => {
    const keys = Object.keys(modifiers);
    return keys.reduce((result, modifierID, index) => {
      const {
        modifierKitchenChitName = "",
        modifierName = "",
        modifierPrice = 0,
      } = modifiers[modifierID];
      const price = _roundNumber(modifierPrice);
      const priceText = ` ($${price.toFixed(2)})`;
      return (
        result +
        `${modifierKitchenChitName || modifierName}${priceText}${
          index < keys.length - 1 ? ", " : ""
        }`
      );
    }, "");
  };
  renderModifierGroups = modifierGroups => {
    const keys = Object.keys(modifierGroups);
    return keys.reduce((result, modifierGroupID, index) => {
      const { modifiers = {} } = modifierGroups[modifierGroupID];
      return (
        result +
        `${this.renderModifiers(modifiers)}${
          index < keys.length - 1 ? ", " : ""
        }`
      );
    }, "");
  };

  render() {
    const { modifierGroups = {} } = this.props;
    return (
      Object.keys(modifierGroups).length > 0 && (
        <View style={Style.modifierContainer}>
          <Text style={Style.itemAddition}>Item Addition:</Text>
          <Text style={Style.modifierItem}>
            {this.renderModifierGroups(modifierGroups)}
          </Text>
        </View>
      )
    );
  }
}

export default Modifiers;
