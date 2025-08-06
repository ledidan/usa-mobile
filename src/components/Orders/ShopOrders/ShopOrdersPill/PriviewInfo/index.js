import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";
import { Text, View } from "react-native";

//Style
import ShopOrderPillStyle from "../style";
import Style from "./style";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Lib
import { Constants } from "lib";
import { TouchableOpacity } from "react-native";

export class ShopOrderPillPreviewInfo extends Component {
  renderPreviewInfo = () => {
    const { orderInfo = {} } = this.props;
    const { customerName } = orderInfo;
    return (
      <View style={Style.previewInfoContainer}>
        <View style={Style.previewInfo}>
          <View style={Style.category}>
            <Text style={Style.label}>Name: </Text>
            <Text
              style={[Style.desc, ShopOrderPillStyle.boldText]}
              numberOfLines={1}>
              {customerName}
            </Text>
          </View>
          {this.renderTableNumberOrPickUpTime()}
        </View>
        {this.renderTimeStamp()}
      </View>
    );
  };

  renderTableNumberOrPickUpTime = () => {
    const { orderInfo = {} } = this.props;
    const { orderDeliveryTypeID, pickUpTime = "ASAP", tableNumber } = orderInfo;
    switch (orderDeliveryTypeID) {
      case "inStore":
        return (
          <View style={Style.category}>
            <Text style={Style.label}>Table: </Text>
            <Text
              style={[Style.desc, ShopOrderPillStyle.boldText]}
              numberOfLines={1}>
              {" "}
              {tableNumber}
            </Text>
          </View>
        );
      case "deliver":
      case "pickUp":
        return (
          <View style={Style.category}>
            <Text style={Style.label}>Pickup Time: </Text>
            <Text
              style={[Style.desc, ShopOrderPillStyle.boldText]}
              numberOfLines={1}>
              {" "}
              {pickUpTime}
            </Text>
          </View>
        );
      default:
        return;
    }
  };

  renderTimeStamp = () => {
    const { orderType } = this.props;
    const { DEFAULT_TIMEZONE } = Constants;
    const DATETIME_FORMAT = `${Constants.DATE_FORMAT} ${Constants.TIME_FORMAT}`;
    const { timeZone } = this.props.context.shopBasicInfo;
    const { closedAt, timeStamp } = this.props.orderInfo;
    const receivedAt = timeStamp;
    const result = formatToTimeZone(
      orderType === "active" ? receivedAt : closedAt,
      DATETIME_FORMAT,
      { timeZone: timeZone || DEFAULT_TIMEZONE },
    );
    switch (orderType) {
      case "active":
        return (
          <View style={Style.category}>
            <Text style={[Style.desc, ShopOrderPillStyle.boldText]}>
              {result}
            </Text>
          </View>
        );
      case "past":
        return (
          <View style={Style.category}>
            <Text style={Style.label}>Close: </Text>
            <Text style={[Style.desc, ShopOrderPillStyle.boldText]}>
              {result}
            </Text>
          </View>
        );
      default:
        return;
    }
  };
  render() {
    const { showExpandedInfo } = this.props;
    return (
      <TouchableOpacity onPress={this.props.onArrowBtnClick}>
        <View style={Style.container}>{this.renderPreviewInfo()}</View>
      </TouchableOpacity>
    );
  }
}
ShopOrderPillPreviewInfo.propTypes = {
  context: PropTypes.shape({
    shopBasicInfo: PropTypes.object.isRequired,
  }).isRequired,
  onArrowBtnClick: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({}).isRequired,
  orderType: PropTypes.oneOf(["active", "past"]).isRequired,
  showExpandedInfo: PropTypes.bool.isRequired,
};

export default withContext(MerchantInterfaceConsumer)(ShopOrderPillPreviewInfo);
