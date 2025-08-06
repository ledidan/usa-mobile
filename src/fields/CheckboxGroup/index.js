import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, useTheme} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StyleVar from 'styles/_variables';

const CheckboxGroup = props => {
  const theme = useTheme();
  const {
    options,
    selectedOptionIDs = [],
    onPress = () => {},
    boxPosition = 'leading',
    checkboxContainerStyle,
    checkboxItemStyle,
    labelStyle,
    required,
    readOnly = false,
    heading,
    headingStyle,
    ...rest
  } = props;
  const renderOptions = () => (
    <View style={[Style.checkboxContainer, checkboxContainerStyle]}>
      {Object.keys(options).map(optionID => {
        const {label} = options[optionID];
        return (
          <Checkbox.Item
            key={optionID}
            label={label}
            status={
              selectedOptionIDs.includes(optionID) ? 'checked' : 'unchecked'
            }
            onPress={() => !readOnly && onPress(optionID)}
            position={boxPosition}
            style={[Style.checkBoxItemContainer, checkboxItemStyle]}
            labelStyle={[Style.labelStyle, labelStyle]}
            theme={theme}
            disabled={readOnly}
            {...rest}
          />
        );
      })}
    </View>
  );
  return (
    <View>
      <View style={[Style.heading, headingStyle]}>
        <Text style={Style.headingText}>{heading}</Text>
        {required ? (
          <Text style={StyleVar.requireText}>required</Text>
        ) : (
          <Text style={StyleVar.optionText}>optional</Text>
        )}
      </View>
      {renderOptions()}
    </View>
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.object.isRequired,
  selectedOptionIDs: PropTypes.array,
  boxPosition: PropTypes.string,
  disabled: PropTypes.bool,
  checkboxContainerStyle: PropTypes.object,
  checkboxItemStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  require: PropTypes.bool,
  heading: PropTypes.string,
  headingStyle: PropTypes.object,
};
export default CheckboxGroup;

const Style = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: responsiveHeight(0.7),
  },
  headingText: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(1.8),
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkBoxItemContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginRight: responsiveWidth(1),
  },
  labelStyle: {
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveFontSize(1.6),
  },
});
