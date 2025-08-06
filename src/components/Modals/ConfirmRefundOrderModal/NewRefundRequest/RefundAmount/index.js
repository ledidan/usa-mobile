import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

//Style
import Style from "./style";

//Fields
import { Strong } from "fields";

function RefundAmount({ refundAmount = 0, selectedRefundTypeId }) {
  const renderRefundAllMsg = () => (
    <Strong style={Style.notice}>Refund everything in the order</Strong>
  );
  const renderRefundAmount = () => (
    <Text style={Style.notice}>
      Refund amount:{" "}
      <Strong>
        ${!refundAmount ? 0 : parseFloat(refundAmount).toFixed(2)}
      </Strong>
    </Text>
  );
  return (
    <View style={Style.container}>
      <View>
        {selectedRefundTypeId === "allItems"
          ? renderRefundAllMsg()
          : renderRefundAmount()}
      </View>
    </View>
  );
}

RefundAmount.propTypes = {
  refundAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selectedRefundTypeId: PropTypes.oneOf([
    "selectItems",
    "customAmount",
    "allItems",
  ]).isRequired,
};

export default RefundAmount;
