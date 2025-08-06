import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {set} from 'object-path-immutable';
import {Text, View} from 'react-native';
import {RadioButton, TouchableRipple} from 'react-native-paper';

import {REFUND_REASONS} from '../HelperFunctions';

//field
import {Input} from 'fields';
const {TextInput} = Input;
//Style
import Style from './style';
import colors from 'styles/_variables';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export class ReasonsList extends Component {
  onChangeReasonInput = text => {
    if (text.length < 50)
      this.props.onSelectReason(set(this.props.selectedReason, 'text', text));
  };

  onSelectReason = optionId => {
    const {label} = REFUND_REASONS[optionId];
    this.props.onSelectReason({
      id: optionId,
      text: optionId !== 'other' ? label : '',
    });
  };

  renderReasonInput = text => {
    return (
      <View style={Style.input}>
        <TextInput
          mode="outlined"
          label="Other Reason"
          onChangeText={this.onChangeReasonInput}
          value={text}
        />
      </View>
    );
  };
  renderOptionsList = (selectedOptionId, readOnly) => {
    return Object.keys(REFUND_REASONS).map(optionId => {
      const {label} = REFUND_REASONS[optionId];
      return (
        <TouchableRipple
          rippleColor={colors.primary}
          onPress={() => this.onSelectReason(optionId)}
          key={optionId}>
          <View style={Style.option}>
            <RadioButton
              color={colors.primary}
              value={label}
              status={optionId === selectedOptionId ? 'checked' : 'unchecked'}
              disabled={readOnly}
              onPress={() => this.onSelectReason(optionId)}
            />
            <Text style={{fontSize: responsiveFontSize(1)}}>{label}</Text>
          </View>
        </TouchableRipple>
      );
    });
  };
  render() {
    const {readOnly, selectedReason = {}} = this.props;
    const {id = '', text} = selectedReason;
    return (
      <View>
        <View style={Style.radioBtnDescription}>
          <Text style={Style.descriptionText}>Select a reason</Text>
          <Text style={colors.requireText}>REQUIRE</Text>
        </View>
        <View style={Style.optionListContainer}>
          {this.renderOptionsList(id, readOnly)}
        </View>

        {id === 'other' && this.renderReasonInput(text)}
      </View>
    );
  }
}

ReasonsList.propTypes = {
  onSelectReason: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  selectedReason: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
};

ReasonsList.defaultProps = {
  readOnly: false,
};

export default ReasonsList;
