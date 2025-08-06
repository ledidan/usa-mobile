import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import _pick from "lodash.pick";
import { set } from "object-path-immutable";
import { Text, View } from "react-native";
import { Checkbox, Button, TouchableRipple } from "react-native-paper";

import ReasonsList from "./ReasonsList";
import RefundAmount from "./RefundAmount";

import {
  _calculateRefundAmount,
  _convertItemsToCheckboxOptions,
  _createEmailRequestToSkipli,
  _createTextMessageToGuest,
  _getSubmitButtonStatus,
  REFUND_TYPES,
} from "./HelperFunctions";

// Utils
import { _roundNumber } from "utils";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

//Style
import Style from "./style";
import colors from "styles/_variables";

//Fields
import { Tabs, Input } from "fields";
const { TextInput } = Input;

// Lib
import { Functions, Services } from "lib";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Sentry from "@sentry/react-native";

export class NewRefundRequest extends Component {
  state = {
    reason: { id: "", text: "" },
    refundAmount: "",
    selectedOrderItems: [],
    selectedRefundTypeId: "selectItems",
  };

  onChangeRefundAmount = (refundAmount = "") => {
    const { selectedRefundTypeId } = this.state;
    let amount = refundAmount;
    if (selectedRefundTypeId === "selectItems") {
      const { orderInfo = {} } = this.props;
      const { orderItems = {} } = orderInfo;
      amount = _calculateRefundAmount({ ...this.state, orderItems });
    } else if (selectedRefundTypeId === "allItems") {
      const { orderInfo = {} } = this.props;
      const { totalPriceAfterTax } = orderInfo;
      amount = _roundNumber(totalPriceAfterTax);
    } else {
      if (isNaN(amount) || parseFloat(amount) < 0) amount = 0;
      else if (amount) amount = _roundNumber(amount);
    }
    this.setState({ refundAmount: amount });
  };

  onChangeRefundTypeId = optionId =>
    !this.state.isCreatingRequest &&
    this.setState(
      {
        reason: { id: "", text: "" },
        refundAmount: "",
        selectedOrderItems: [],
        selectedRefundTypeId: optionId,
      },
      this.onChangeRefundAmount,
    );

  onCloseModal = () =>
    !this.state.isCreatingRequest && this.props.onCloseModal();

  onNotifyGuestOfRefund = async () => {
    const { BUTI } = Services;
    const { SendTextMessage } = BUTI.PostRequests;
    const { shopBasicInfo } = this.props;

    const { orderInfo = {} } = this.props;
    const { customerName, phoneNumber, timeStamp } = orderInfo;
    const { name: shopName, timeZone } = shopBasicInfo;
    try {
      await SendTextMessage({
        body: _createTextMessageToGuest({
          ...this.state,
          customerName,
          shopName,
          shopTimeZone: timeZone,
          timeStamp,
        }),
        to: phoneNumber,
      });
    } catch {}
  };

  onSendRequestToSkipli = async ({ refund_request_id } = {}) => {
    const { BUTI } = Services;
    const { SendEmail } = BUTI.PostRequests;
    const { personnel, shopBasicInfo, shopID } = this.props;
    const { email_body, email_subject } = _createEmailRequestToSkipli({
      ...this.state,
      orderId: this.props.orderID,
      orderInfo: this.props.orderInfo,
      personnel,
      refund_request_id,
      shopBasicInfo,
      shopID,
    });
    try {
      await SendEmail({
        addresses: ["support@skiplinow.com"],
        subject: email_subject,
        body: email_body,
        shop_id: shopID,
      });
    } catch (error) {
      Sentry.captureException(error, {
        message: "Error in NewRefundRequest.onSendRequestToSkipli",
      });
    }
  };

  onSelectOrderItem = id => {
    const { selectedOrderItems = [] } = this.state;
    this.setState(
      {
        selectedOrderItems: selectedOrderItems.includes(id)
          ? selectedOrderItems.filter(orderItemID => orderItemID !== id)
          : selectedOrderItems.concat(id),
      },
      this.onChangeRefundAmount,
    );
  };
  onSubmitRefundRequest = async () => {
    this.setState({ isCreatingRequest: true });
    const { Merchants } = Services;
    const { CreateRefundRequest } = Merchants.PostRequests;
    const { ShowConfirmNotif } = Functions;
    const refund_request_id = nanoid(12);
    const { shopID } = this.props;
    const request_details = _pick(this.state, [
      "reason",
      "refundAmount",
      "selectedOrderItems",
      "selectedRefundTypeId",
    ]);

    try {
      const { createdAt } = await CreateRefundRequest({
        orderId: this.props.orderID,
        refund_request_id,
        request_details,
        shopId: shopID,
      });
      ShowConfirmNotif({
        title: "Success",
        message: "Your refund request is sent!",
        type: "success",
      });
      await this.onNotifyGuestOfRefund();
      await this.onSendRequestToSkipli({ refund_request_id });
      this.setState({ isCreatingRequest: false }, () =>
        this.props.onRefundRequestSuccess({
          refund_request_id,
          request_details: set(request_details, "createdAt", createdAt),
        }),
      );
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          message: "Error in NewRefundRequest.onSubmitRefundRequest",
          request_details,
        },
      });
      ShowConfirmNotif({
        title: "Error",
        message: "Please try again!",
        type: "error",
      });
      this.setState({ isCreatingRequest: false });
    }
  };

  renderButtons = () => {
    return (
      <View style={Style.buttons}>
        <Button
          mode="contained"
          color="white"
          labelStyle={[Style.btnLabel, { color: colors.primary }]}
          style={Style.cancelButton}
          onPress={this.onCloseModal}>
          Cancel
        </Button>
        <Button
          mode="contained"
          labelStyle={Style.btnLabel}
          style={[
            Style.submitButton,
            _getSubmitButtonStatus(this.state) === "inactive" && {
              opacity: 0.6,
            },
          ]}
          onPress={() =>
            _getSubmitButtonStatus(this.state) !== "inactive" &&
            this.onSubmitRefundRequest()
          }
          loading={_getSubmitButtonStatus(this.state) === "loading"}>
          {_getSubmitButtonStatus(this.state) === "loading"
            ? "Requesting"
            : "Request Refund"}
        </Button>
      </View>
    );
  };
  renderConfirmation = () => {
    return (
      <View style={Style.confirmBoxContainer}>
        <Checkbox
          status={this.state.confirmed ? "checked" : "unchecked"}
          onPress={() => this.setState({ confirmed: !this.state.confirmed })}
        />
        <Text>
          I confirm the refund adheres to the restaurant policy and is processed
          immediately. A copy will be sent to my manager for later review.
        </Text>
      </View>
    );
  };
  renderItemsList = (items = {}) => {
    const itemList = _convertItemsToCheckboxOptions(items);
    return (
      <View style={Style.itemListContainer}>
        <View style={Style.checkboxDescription}>
          <Text style={Style.descriptionText}>Select items to refund</Text>
          <Text style={colors.requireText}>REQUIRED</Text>
        </View>
        {this.renderItem(itemList)}
      </View>
    );
  };
  renderItem = (itemList = {}) => {
    return Object.keys(itemList).map(itemId => {
      const { label, description } = itemList[itemId];
      return (
        <TouchableRipple
          key={itemId}
          rippleColor={colors.primary}
          onPress={() => {
            this.onSelectOrderItem(itemId);
          }}>
          <View style={Style.itemContainer}>
            <Checkbox
              color={colors.primary}
              status={
                this.state.selectedOrderItems.includes(itemId)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => {
                this.onSelectOrderItem(itemId);
              }}
              disabled={this.state.isCreatingRequest}
            />
            <View style={{ flex: 1 }}>
              {label}
              {description}
            </View>
          </View>
        </TouchableRipple>
      );
    });
  };

  renderRefundAmountInput = () => {
    return (
      <TextInput
        mode="outlined"
        label="Refund Amount ($)"
        disabled={this.state.isCreatingRequest}
        onChangeText={this.onChangeRefundAmount}
        keyboardType="decimal-pad"
        value={this.state.refundAmount}
        containerStyle={Style.refunAmtInput}
      />
    );
  };

  renderRefundType = () => {
    const { orderInfo = {} } = this.props;
    const { orderItems } = orderInfo;
    switch (this.state.selectedRefundTypeId) {
      case "customAmount":
        return this.renderRefundAmountInput();
      case "selectItems":
        return this.renderItemsList({ items: orderItems });
      default:
        return;
    }
  };

  renderSelectedRefundTypes = () => {
    return (
      <View style={{ marginBottom: responsiveHeight(2) }}>
        <Tabs
          onPress={this.onChangeRefundTypeId}
          options={REFUND_TYPES}
          selectedOptionId={this.state.selectedRefundTypeId}
        />
      </View>
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.renderSelectedRefundTypes()}
        {this.renderRefundType()}
        <ReasonsList
          onSelectReason={reason => this.setState({ reason })}
          readOnly={this.state.isCreatingRequest}
          selectedReason={this.state.reason}
        />
        <RefundAmount
          refundAmount={this.state.refundAmount}
          selectedRefundTypeId={this.state.selectedRefundTypeId}
        />
        {this.renderButtons()}
      </React.Fragment>
    );
  }
}

NewRefundRequest.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onRefundRequestSuccess: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  orderInfo: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    orderDeliveryTypeID: PropTypes.oneOf(["inStore", "deliver", "pickUp"])
      .isRequired,
    orderItems: PropTypes.object.isRequired,
    paymentIntentID: PropTypes.string,
    phoneNumber: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
    totalPriceAfterTax: PropTypes.any.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  refundRequests: PropTypes.object,
};

export default withContext(MerchantInterfaceConsumer)(NewRefundRequest);
