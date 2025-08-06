import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {Switch, withTheme} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StyleVar from 'styles/_variables';

class SwitchItem extends React.Component {
  onValueChange = () => {
    this.props.onSwitch({
      value: this.state.value,
      optionID: this.state.optionID,
    });
  };

  render() {
    const {
      theme,
      label,
      value,
      required,
      readOnly = false,
      containerStyle,
      labelStyle,
      switchStyle,
      onSwitch,
      ...rest
    } = this.props;
    return (
      <View style={[Style.container, containerStyle]}>
        <Text style={[Style.label, labelStyle]}>{label}</Text>
        {required ? (
          <Text style={StyleVar.requireText}>required</Text>
        ) : (
          <Text style={StyleVar.optionText}>optional</Text>
        )}
        <Switch
          theme={theme}
          color={StyleVar.primary}
          value={this.props.value}
          onValueChange={value =>
            onSwitch({value, optionID: value ? 'true' : 'false'})
          }
          style={[Style.switch, switchStyle]}
          disabled={readOnly}
          {...rest}
        />
      </View>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1),
    alignItems: 'center',
  },
  label: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
  },
  switch: {
    marginLeft: responsiveWidth(5),
    alignSelf: 'flex-end',
  },
});

SwitchItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  containerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  switchStyle: PropTypes.object,
  onSwitch: PropTypes.func.isRequired,
};
SwitchItem.defaultProps = {
  label: '',
  value: false,
  required: false,
  readOnly: false,
  onSwitch: () => {},
};
export default withTheme(SwitchItem);
