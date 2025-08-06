import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Platform,
} from "react-native";

import { Portal, Modal as PaperModal } from "react-native-paper";

import ContentDescription from "./ContentDescription";
import Footer from "./Footer";
import Header from "./Header";

// Style
import Style from "./style";

// Lib
import { Functions } from "lib";

const { ShowConfirmNotif } = Functions;

export class ModalTemplate extends Component {
  
  state = { isSubmitting: false };

  componentDidMount() {
    this._isMounted = true;
  
    if (Platform.OS === "android") {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackPress
      );
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  
    if (this.backHandler) this.backHandler.remove();
  }
  
  handleBackPress = () => {
    const { isSubmitting } = this.state;
    if (!isSubmitting) {
      this.props.onCloseModal?.();
      return true;
    }
    return false;
  };
  onCloseModal = () => {
    !this.state.isSubmitting && this.props.onCloseModal?.();
  };

  onSubmit = async () => {
    const { onSubmit = () => {} } = this.props;
  
    if (!this._isMounted) return;
  
    this.setState({ isSubmitting: true });
  
    try {
      await onSubmit();
  
      if (this._isMounted) {
        this.setState({ isSubmitting: false }, () => {
          this.props.closeModalAfterSuccessSubmit && this.onCloseModal();
        });
      }
    } catch (e) {
      ShowConfirmNotif({
        title: "Error",
        message: "An error occured. Please try again.",
        type: "error",
      });
  
      if (this._isMounted) {
        this.setState({ isSubmitting: false });
      }
    }
  };
  

  render() {
    const {
      modalStyle = {},
      contentDescriptionProps = {},
      footerProps = {},
      headerProps = {},
      shouldCloseOnOverlayClick = true,
      isFullScreen = false,
    } = this.props;

    const { isSubmitting } = this.state;

    return (
      <Portal>
        <PaperModal
          visible={true}
          onDismiss={this.onCloseModal}
          contentContainerStyle={[
            isFullScreen
              ? Style.modalContainerFullScreen
              : Style.modalContainer,
            modalStyle.modalContainer,
          ]}
          dismissable={shouldCloseOnOverlayClick}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (shouldCloseOnOverlayClick) this.onCloseModal();
              Keyboard.dismiss();
            }}>
            <View style={[Style.backdrop, modalStyle.overlay]}>
              <TouchableWithoutFeedback>
                <View
               >
                  <Header
                    style={modalStyle}
                    headerProps={headerProps}
                    onCloseModal={this.onCloseModal}
                  />
                  <ContentDescription
                    style={modalStyle}
                    contentDescriptionProps={contentDescriptionProps}
                  />
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                      Style.contentContainer,
                      modalStyle.contentContainer,
                      isSubmitting ? Style.disableContent : "",
                    ]}>
                    {this.props.children}
                  </ScrollView>
                  <Footer
                    style={modalStyle}
                    footerProps={footerProps}
                    isSubmitting={isSubmitting}
                    onCloseModal={this.onCloseModal}
                    onSubmit={this.onSubmit}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </PaperModal>
      </Portal>
    );
  }
}

ModalTemplate.propTypes = {
  children: PropTypes.any.isRequired,
  modalStyle: PropTypes.shape({
    contentContainer: PropTypes.shape({}),
    contentDescriptionContainer: PropTypes.shape({}),
    footerContainer: PropTypes.shape({}),
    headerContainer: PropTypes.shape({}),
    overlay: PropTypes.shape({}),
    modalContainer: PropTypes.shape({}),
  }),
  closeModalAfterSuccessSubmit: PropTypes.bool,
  contentLabel: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  shouldCloseOnOverlayClick: PropTypes.bool,
  isFullScreen: PropTypes.bool,
};

ModalTemplate.defaultProps = {
  modalStyle: {},
  closeModalAfterSuccessSubmit: true,
  onSubmit: () => {},
  shouldCloseOnOverlayClick: true,
  isFullScreen: false,
};

export default ModalTemplate;
