import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';

//Style
import Style from './style';
import color from 'styles/_variables';

export class Footer extends Component {
  renderSubmitButton = (submitButtonProps = {}) => {
    const {
      activeText = 'Submit',
      loadingText = 'Loading',
      status = 'active',
    } = submitButtonProps;
    const {onSubmit = () => {}} = this.props;
    return (
      <Button
        mode="contained"
        labelStyle={Style.btnLabel}
        style={Style.submitButton}
        loading={this.props.isSubmitting}
        disabled={this.props.isSubmitting}
        onPress={onSubmit}>
        {this.props.isSubmitting ? loadingText : activeText}
      </Button>
    );
  };
  render() {
    const {style = {}, footerProps = {}, isSubmitting = false} = this.props;
    const {
      customFooter,
      showFooter = false,
      submitButtonProps = {},
    } = footerProps;
    if (!showFooter) return null;
    else if (customFooter) {
      return <View>{customFooter}</View>;
    }
    return (
      <View style={[Style.footerContainer, style.footerContainer]}>
        <Button
          mode="contained"
          color="white"
          style={Style.cancelButton}
          labelStyle={[Style.btnLabel, {color: color.primary}]}
          disabled={this.props.isSubmitting}
          onPress={this.props.onCloseModal}>
          Cancel
        </Button>
        {this.renderSubmitButton()}
      </View>
    );
  }
}

Footer.propTypes = {
  style: PropTypes.shape({
    footerContainer: PropTypes.string,
  }),
  footerProps: PropTypes.shape({
    customFooter: PropTypes.any,
    showFooter: PropTypes.bool,
    submitButtonProps: PropTypes.shape({
      activeText: PropTypes.string,
      loadingText: PropTypes.string,
      status: PropTypes.oneOf(['active', 'inactive']),
    }),
  }),
  isSubmitting: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

Footer.defaultProps = {
  footerProps: {
    customFooter: null,
    showFooter: false,
    submitButtonProps: {
      activeText: 'Submit',
      loadingText: 'Loading',
      status: 'active',
    },
  },
  isSubmitting: false,
  onSubmit: () => {},
};

export default Footer;
