import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
//Style
import Style from "./style";

// Icons
import { CloseWhiteIcon } from "assets/Icons";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class ModalHeader extends Component {
  render() {
    const { style = {}, headerProps = {} } = this.props;
    const { customHeader, header = "", showHeader = true } = headerProps;
    if (!showHeader) return null;
    else if (customHeader) {
      return (
        <View style={[Style.headerContainer, style.headerContainer]}>
          {customHeader}
        </View>
      );
    }
    return (
      <View style={[Style.headerContainer, style.headerContainer]}>
        <TouchableOpacity onPress={this.props.onCloseModal}>
          <MaterialComIcon
            name="close-box"
            size={responsiveWidth(2)}
            style={Style.closeIcon}
          />
        </TouchableOpacity>
        {!!header && <Title style={Style.header}>{header}</Title>}
      </View>
    );
  }
}
ModalHeader.propTypes = {
  style: PropTypes.shape({
    headerContainer: PropTypes.string,
  }),
  headerProps: PropTypes.shape({
    customHeader: PropTypes.any,
    header: PropTypes.string,
    showHeader: PropTypes.bool,
  }),
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalHeader;
