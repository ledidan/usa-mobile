import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Title } from "react-native-paper";

import Style from "./style";

export class ModalContentDescription extends Component {
  render() {
    const { style = {}, contentDescriptionProps = {} } = this.props;
    const {
      contentDescription,
      showContentDescription = false,
      title,
    } = contentDescriptionProps;
    if (!showContentDescription || !contentDescription) return null;
    return (
      <View
        style={[
          Style.contentDescriptionContainer,
          style.contentDescriptionContainer,
        ]}>
        {title && <Title style={Style.title}>{title}</Title>}
        <Text style={Style.contentDescription}>{contentDescription}</Text>
      </View>
    );
  }
}

ModalContentDescription.defaultProps = {
  style: PropTypes.shape({
    contentDescriptionContainer: PropTypes.shape(),
  }),
  contentDescriptionProps: PropTypes.shape({
    contentDescription: PropTypes.any,
    showContentDescription: PropTypes.bool,
    title: PropTypes.string,
  }),
};

ModalContentDescription.defaultProps = {
  style: {},
  contentDescriptionProps: {
    contentDescription: null,
    showContentDescription: false,
    title: "Did you know?",
  },
};
export default ModalContentDescription;
