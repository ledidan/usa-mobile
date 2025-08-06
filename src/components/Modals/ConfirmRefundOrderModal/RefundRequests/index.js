import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

//Style
import Style from "./style";

// Lib
import { Functions } from "lib";

export class RefundRequests extends Component {
  onConvertCreatedAt = createdAt => {
    const { DateTime } = Functions;
    const { _convertUTCTimestampToLocalTime } = DateTime;
    const { local_date, local_time } = _convertUTCTimestampToLocalTime({
      localTimeZone: _get(this.props.context, "shopBasicInfo.timeZone"),
      timeStamp: createdAt,
    });
    return `${local_date} ${local_time}`;
  };

  renderButtons = () => {
    return (
      <View style={Style.buttons}>
        <Button
          mode="contained"
          color="white"
          style={Style.cancelButton}
          onPress={this.props.onCloseModal}>
          Cancel
        </Button>
        <Button
          mode="contained"
          style={Style.submitButton}
          onPress={this.props.onCreateNewRequest}>
          Create New Request
        </Button>
      </View>
    );
  };
  renderRefundRequest = () => {
    const { refundRequests = {} } = this.props;
    return Object.keys(refundRequests).map(requestId => {
      const { createdAt, reason } = refundRequests[requestId];
      return (
        <View style={Style.refundRequests} key={requestId}>
          <Text style={Style.requestId}>Request #: {requestId}</Text>
          <View style={Style.infoRow}>
            <Text style={Style.label}>Created: </Text>
            <Text style={Style.desc}>{this.onConvertCreatedAt(createdAt)}</Text>
          </View>
          {/* <View style={Style.infoRow}>
            <Text style={Style.label}>Refund Amount: </Text>
            <Text style={Style.desc}>
              {parseFloat(refundAmount).toFixed(2)}
            </Text>
          </View> */}
          <View style={Style.infoRow}>
            <Text style={Style.label}>Reason: </Text>
            <Text style={Style.desc}>{reason.text}</Text>
          </View>
        </View>
      );
    });
  };
  render() {
    return (
      <View style={Style.borderTop}>
        <View>{this.renderRefundRequest()}</View>
        {this.renderButtons()}
      </View>
    );
  }
}

export default RefundRequests;
