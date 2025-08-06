import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {Checkbox, TouchableRipple} from 'react-native-paper';

//Style
import colors from 'styles/_variables';

//field
import {Modal, Strong} from 'fields';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export class ConfirmCloseOrderModal extends PureComponent {
  state = {sendOrderReadyText: true};
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }

  onConfirmClosePickupOrder = () => {
    this.props.onClosePickupOrder({
      sendOrderReadyText: this.state.sendOrderReadyText,
    });
    this.props.onCloseModal();
  };

  render() {
    const {sendOrderReadyText} = this.state;
    return (
      <Modal
        contentLabel="confirm close order modal"
        contentDescriptionProps={{
          contentDescription: (
            <Text>
              Order will move to <Strong>Past Orders</Strong> after you click
              Submit
            </Text>
          ),
          showContentDescription: true,
        }}
        footerProps={{
          showFooter: true,
          submitButtonProps: {
            activeText: 'Submit',
            loadingText: 'Submitting',
          },
        }}
        headerProps={{header: 'Close Order'}}
        onCloseModal={this.props.onCloseModal}
        onSubmit={this.onConfirmClosePickupOrder}
        modalStyle={{modalContainer: {marginHorizontal: '25%', height: '50%'}}}>
        <TouchableRipple
          rippleColor={colors.primary}
          onPress={() =>
            this.setState({sendOrderReadyText: !sendOrderReadyText})
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              color={colors.primary}
              status={sendOrderReadyText ? 'checked' : 'unchecked'}
              onPress={() =>
                this.setState({sendOrderReadyText: !sendOrderReadyText})
              }
            />
            <Text style={{fontSize: responsiveFontSize(1)}}>
              Notify customer the order is ready for pick up/delivery
            </Text>
          </View>
        </TouchableRipple>
      </Modal>
    );
  }
}
ConfirmCloseOrderModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onClosePickupOrder: PropTypes.func.isRequired,
};

export default ConfirmCloseOrderModal;
