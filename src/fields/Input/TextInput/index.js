import React, { Component } from "react";
import { StyleSheet, View, TextInput as NativeInput } from "react-native";
import {
  TextInput as RNPInput,
  HelperText,
  useTheme,
} from "react-native-paper";
import PropTypes from "prop-types";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

const TextInput = props => {
  const theme = useTheme();
  const {
    containerStyle = {},
    textInputStyle = {},
    type = "single",
    multiline = false,
    numberOfLines = 1,
    errMsg,
    errTextStyle,
    ...rest
  } = props;
  const isTextarea = type === "textarea" ? true : false;
  const Style = StyleSheet.create({
    inputContainer: {
      height: responsiveHeight(10),
      fontSize: responsiveFontSize(1.2),
      backgroundColor: "#fff",
    },
    textInput: {
      height: responsiveHeight(10),
      paddingTop: responsiveHeight(1),
      paddingBottom: responsiveHeight(1),
    },
    errMsg: {
      fontSize: responsiveFontSize(0.8),
      paddingVertical: responsiveHeight(0.8),
    },
    textarea: {
      maxHeight: responsiveHeight(15),
      fontSize: responsiveFontSize(1.2),
      backgroundColor: "#fff",
    },
  });
  return (
    <View>
      <RNPInput
        multiline={multiline || isTextarea}
        numberOfLines={numberOfLines}
        style={[
          !isTextarea && Style.inputContainer,
          isTextarea && Style.textarea,
        ].concat(containerStyle)}
        theme={theme}
        render={innerProps => (
          <NativeInput
            {...innerProps}
            style={[innerProps.style, !isTextarea && Style.textInput].concat(
              textInputStyle,
            )}
          />
        )}
        {...rest}
      />
      {!!errMsg && (
        <HelperText type="error" style={[Style.errMsg, errTextStyle]}>
          {errMsg}
        </HelperText>
      )}
    </View>
  );
};

export default TextInput;
TextInput.propTypes = {

  textInputStyle: PropTypes.object || PropTypes.array,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  errMsg: PropTypes.string || PropTypes.array,
  errTextStyle: PropTypes.object,
};
