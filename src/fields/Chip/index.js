import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

//style
import Style from "./style";

export class Chip extends Component {
  renderAvatar = () =>
    this.props.avatar && (
      <TouchableOpacity style={Style.avatar} onPress={this.props.onPressAvatar}>
        {this.props.avatar()}
      </TouchableOpacity>
    );

  renderLabel = () => (
    <TouchableOpacity
      onPress={this.props.onPressLabel}
      style={[Style.label, this.props.renderLabelExtraStyles]}>
      {this.props.label()}
    </TouchableOpacity>
  );
  renderHelperButton = () =>
    this.props.helperButtonContent && (
      <TouchableOpacity
        onPress={this.props.onPressHelpButton}
        style={[Style.helperButton, this.props.helperButtonStyle]}>
        {this.props.helperButtonContent()}
      </TouchableOpacity>
    );
  render() {
    return (
      <View style={[Style.chip, this.props.chipContainerStyle]}>
        {this.renderAvatar()}
        {this.renderLabel()}
        {this.renderHelperButton()}
      </View>
    );
  }
}

Chip.propTypes = {
  avatar: PropTypes.any,
  chipContainerStyle: PropTypes.object,
  helperButtonStyle: PropTypes.object,
  helperButtonContent: PropTypes.any,
  label: PropTypes.any,
  labelStyle: PropTypes.object,
  onPressAvatar: PropTypes.func,
  onPressLabel: PropTypes.func,
  onPressHelpBtn: PropTypes.func,
};

Chip.defaultProps = {
  onPressAvatar: () => {},
  onPressLabel: () => {},
  onPressHelpBtn: () => {},
};
export default Chip;
