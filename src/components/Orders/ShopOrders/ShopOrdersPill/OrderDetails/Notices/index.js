import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";

//Style
import Style from "./style";

const Notices = props => {
  const renderRefundRequests = () => {
    const { refundRequests = {}, onShowRefundModal } = props;
    const requests_count = Object.keys(refundRequests).length;
    return (
      requests_count > 0 && (
        <TouchableOpacity
          style={Style.refundRequests}
          onPress={onShowRefundModal}>
          <Text style={Style.text}>Refund Requests</Text>
          <View style={Style.requestCount}>
            <Text style={Style.count}>{requests_count}</Text>
          </View>
        </TouchableOpacity>
      )
    );
  };
  return (
    <View style={Style.container}>
      <Text style={Style.paidOrderMessage}>Order is paid by customer</Text>
      {renderRefundRequests()}
    </View>
  );
};

Notices.propTypes = {
  refundRequests: PropTypes.object,
};

Notices.defaultProps = {
  refundRequests: {},
};

export default Notices;
