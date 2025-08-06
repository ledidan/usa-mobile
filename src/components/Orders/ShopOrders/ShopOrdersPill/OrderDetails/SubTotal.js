import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

// Utils
import { _roundNumber } from "utils";

// Style
import Style from "./style";

// Lib
import { Functions } from "lib";

const SubTotal = ({ itemsCount, orderID, orderInfo }) => {
  const { OrderMathFuncs } = Functions;
  const { _calSubTotalOfOrder, _calcSubTotalPlusTax } = OrderMathFuncs;
  const {
    // merchantFees = {},
    orderItems = {},
  } = orderInfo;

  // const { totalFee = 0 } = merchantFees;
  const subTotal = _calSubTotalOfOrder({ orderItems });
  const subTotalPlusTax = _calcSubTotalPlusTax({ orderDetails: orderInfo });
  const tax = _roundNumber(parseFloat(subTotalPlusTax) - parseFloat(subTotal));
  // const showMerchantFees =
  //   this.props.orderType === "past" && parseFloat(totalFee) > 0;

  return (
    <View style={Style.subTotal}>
      <View style={Style.subTotalItem}>
        <Text style={[Style.subTotalText, { fontWeight: "bold" }]}>
          Order #{orderID}
        </Text>
      </View>
      <View style={Style.subTotalItem}>
        <Text style={[Style.label, Style.subTotalText]}>Items:</Text>
        <Text style={[Style.amount, Style.subTotalText]}>
          {itemsCount} Item{itemsCount === 1 ? "" : "s"}
        </Text>
      </View>
      <View style={Style.subTotalItem}>
        <Text style={[Style.label, Style.subTotalText]}>Sub Total:</Text>
        <Text style={[Style.amount, Style.subTotalText]}>
          ${subTotal.toFixed(2)}
        </Text>
      </View>
      <View style={Style.subTotalItem}>
        <Text style={[Style.label, Style.subTotalText]}>Sales Tax:</Text>
        <Text style={[Style.amount, Style.subTotalText]}>
          ${tax.toFixed(2)}
        </Text>
      </View>
      {/* {showMerchantFees && (
        <View style={[Style.subTotalItem, Style.totalMerchantFee]}>
          <Text style={Style.label}>Total Fee:</Text>
          <Text style={Style.amount}>${_roundNumber(totalFee)}</Text>
        </View>
      )} */}
    </View>
  );
};
SubTotal.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  orderID: PropTypes.string.isRequired,
  orderInfo: PropTypes.object.isRequired,
};
export default SubTotal;
