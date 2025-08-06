import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import Icons from "react-native-vector-icons/Ionicons";

//Fields
import { Modal, Strong } from "fields";

//Style
import Style from "./style";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class WarningModal extends Component {
  renderTitle = () => (
    <React.Fragment>
      <Icons name="md-warning-outline" size={responsiveWidth(2.5)} />
      <Strong>{"  "}WARNING!</Strong>
    </React.Fragment>
  );
  render() {
    return (
      <Modal
        onCloseModal={this.props.onCloseModal}
        shouldCloseOnOverlayClick={false}
        contentLabel="Warning Modal"
        headerProps={{ showHeader: false }}
        contentDescriptionProps={{
          title: this.renderTitle(),
          contentDescription: (
            <Text style={Style.descText}>{this.props.contentDescription}</Text>
          ),
          showContentDescription: true,
        }}
        modalStyle={{
          modalContainer: Style.modalContainer,
          contentDescriptionContainer: Style.contentDescriptionContainer,
        }}>
        {!!this.props.imgSource && (
          <Image
            style={Style.image}
            source={this.props.imgSource} //Either use Require("pathToImage/image.png") or {uri: "http://UrlToImage/image.gif"}
            resizeMode="contain"
          />
        )}
        <Text style={Style.message}>{this.props.message}</Text>
        {this.props.showButtons &&
          (this.props.is_custom_button ? (
            <Button
              mode="contained"
              onPress={this.props.onSubmit}
              style={this.props.style}
              labelStyle={Style.btnLabel}>
              {this.props.submitBtnLabel}
            </Button>
          ) : (
            <View style={Style.buttonContainer}>
              {this.props.showCancelBtn && (
                <Button
                  onPress={this.props.onCloseModal}
                  style={Style.btn}
                  labelStyle={Style.btnLabel}>
                  Cancel
                </Button>
              )}
              <Button
                mode="contained"
                onPress={this.props.onSubmit}
                style={Style.btn}
                labelStyle={Style.btnLabel}>
                {this.props.submitBtnLabel}
              </Button>
            </View>
          ))}
      </Modal>
    );
  }
}

WarningModal.propTypes = {
  contentDescription: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showButtons: PropTypes.bool,
  showCancelBtn: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitBtnLabel: PropTypes.string,
};
WarningModal.defaultProps = {
  showButtons: false,
  showCancelBtn: false,
  submitBtnLabel: "Submit",
  onSubmit: () => {},
};

export default WarningModal;
