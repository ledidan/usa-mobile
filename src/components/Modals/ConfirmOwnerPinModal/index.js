import React from "react";
import { View, KeyboardAvoidingView, ScrollView, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import { Modal } from "fields";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/react-native";

//lib
import { Services } from "lib";

//field
import { Input } from "fields";
const { TextInput } = Input;

//Style
import Style from "./style";

class ConfirmOwnerPinModal extends React.Component {
  state = { pin: "", isVerifying: false, errMsg: "", isKeyboardOpen: false };

  componentWillUnmount() {
    this.keyboardDidShowListener?.remove();
    this.keyboardDidHideListener?.remove();
    this.setState = () => {};
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide,
    );
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardOpen: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardOpen: false });
  };

  onConfirm = () => {
    const { Merchants } = Services;
    const { VerifyPersonnelPin, GetShopPersonnelInfo } = Merchants.GetRequests;
    const { shopID } = this.props;
    this.setState({ isVerifying: true });
    VerifyPersonnelPin({
      shopID,
      personnelPin: this.state.pin,
    })
      .then(({ personnelID, success }) => {
        if (!personnelID || !success) {
          this.setState({ errMsg: "Invalid pin", isVerifying: false });
          return { success: false };
        }
        return GetShopPersonnelInfo({ shopID, personnelID });
      })
      .then(({ personnel, success }) => {
        if (!success)
          return this.setState({ errMsg: "Invalid pin", isVerifying: false });
        const { role } = personnel;
        if (role === "owner") {
          this.props.onCallback();
        } else this.setState({ errMsg: "Invalid pin" });
      })
      .catch(err => {
        Sentry.captureException(err, {
          extra: {
            message: "Error VerifyPersonnelPin in ConfirmOwnerPinModal",
            personnelPin: this.state.pin,
            shopID: shopID,
          },
        });
        console.log(err);
      })
      .finally(() => this.setState({ isVerifying: false }));
  };
  renderButtons = () => {
    return (
      <View style={Style.btnContainer}>
        <Button
          mode="outlined"
          onPress={this.props.onCloseModal}
          labelStyle={Style.btnLabel}
          style={Style.btn}>
          Cancel
        </Button>
        <Button
          mode="contained"
          style={Style.btn}
          labelStyle={Style.btnLabel}
          onPress={this.onConfirm}
          disabled={this.state.isVerifying}
          loading={this.state.isVerifying}>
          {this.state.isVerifying ? "Validating" : "Confirm"}
        </Button>
      </View>
    );
  };
  render() {
    return (
      <Modal
        contentLabel="Enter Owner's Pin"
        headerProps={{ showHeader: false }}
        contentDescriptionProps={{
          showContentDescription: true,
          title: "Confirm the owner's pin",
          contentDescription: true,
        }}
        onCloseModal={this.props.onCloseModal}
        modalStyle={{
          modalContainer: {
            width: "40%",
            height: this.state.isKeyboardOpen ? "100%" : "50%",
          },
          contentContainer: {
            minWidth: "100%",
          },
        }}>
        <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              mode="outlined"
              value={this.state.pin}
              errMsg={this.state.errMsg}
              label="Pin"
              keyboardType="number-pad"
              secureTextEntry
              containerStyle={Style.textInput}
              onChangeText={pin => this.setState({ pin })}
            />
            {this.renderButtons()}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
ConfirmOwnerPinModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onCallback: PropTypes.func.isRequired,
  shopID: PropTypes.string.isRequired,
};

export default ConfirmOwnerPinModal;
