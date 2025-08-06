import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

//Style
import Style from "./style";

export class Tabs extends Component {
  renderOptions = () => {
    const { style = {}, options = {}, selectedOptionId } = this.props;
    const numOptions = Object.keys(options).length;
    const optionWidth = 100 / numOptions;
    return Object.keys(options).map(optionId => {
      const { label, description = "" } = options[optionId];
      return (
        <Button
          key={optionId}
          mode={optionId === selectedOptionId ? "contained" : "text"}
          labelStyle={Style.tabLabel}
          style={[Style.tab, style.tab, { width: `${optionWidth}%` }]}
          onPress={() => this.props.onPress(optionId)}>
          {label}
          {!!description && <Text style={Style.tabLabel}>{description}</Text>}
        </Button>
      );
    });
  };
  render() {
    const { style = {} } = this.props;
    return (
      <View style={[Style.container, style.container]}>
        {this.renderOptions()}
      </View>
    );
  }
}
Tabs.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  selectedOptionId: PropTypes.string,
};

Tabs.defaultProps = {
  style: {},
};

export default Tabs;
