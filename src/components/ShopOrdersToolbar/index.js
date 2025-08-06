import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

import DisplayOrdersCount from "./DisplayOrdersCount";

//Style
import Style from "./style";

// Fields
import { DateRangePicker, TimeRangePicker } from "fields"; //TODO implement DateRangePicker and TimeRangePicker

//Icons
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
// Context
import { MerchantInterfaceConsumer, withContext } from "context";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class ShopOrdersToolbar extends Component {
  renderDateRangePicker = () => (
    <View style={Style.elementContainer}>
      <DateRangePicker
        onChange={this.props.onChangeDateRange}
        selectedDayRange={this.props.selectedDayRange}
        isSelected={this.props.selectedTimeRangeID === "dateRange"}
      />
    </View>
  );
  renderExpandOrdersButton = () => {
    const { ordersCount } = this.props;
    return (
      <View style={Style.elementContainer}>
        <TouchableOpacity
          style={Style.expandOrderButton}
          onPress={this.props.onExpandAllOrders}>
          <Text style={Style.btnLabel}>
            {ordersCount} {ordersCount === 1 ? "Order" : "Orders"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTimeRangePicker = () => {
    const { context } = this.props;
    const { timeZone } = context.shopBasicInfo;
    return (
      <View style={Style.elementContainer}>
        <TimeRangePicker
          onChange={this.props.onChangeTimeRange}
          selectedTimeRangeID={this.props.selectedTimeRangeID}
          timeZone={timeZone}
        />
      </View>
    );
  };
  renderRefreshButton = () => {
    return (
      <View style={Style.elementContainer}>
        <TouchableOpacity
          style={Style.expandOrderButton}
          onPress={this.props.onRefresh}>
          <MaterialCommIcon
            name="refresh"
            size={responsiveWidth(1.6)}
            style={Style.btnIcon}
          />
          <Text style={Style.btnLabel}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { orderType = "activeOrders" } = this.props;
    return (
      <View style={Style.container}>
        {this.renderExpandOrdersButton()}
        {/* <DisplayOrdersCount
          numOrdersPerRow={this.props.numOrdersPerRow}
          onChangeNumOrdersPerRow={this.props.onChangeNumOrdersPerRow}
        /> */}
        {orderType === "pastOrders" && this.renderDateRangePicker()}
        {orderType === "pastOrders" && this.renderTimeRangePicker()}
        {this.renderRefreshButton()}
      </View>
    );
  }
}

ShopOrdersToolbar.propTypes = {
  context: PropTypes.shape({
    shopBasicInfo: PropTypes.object.isRequired,
  }).isRequired,
  expandAllOrders: PropTypes.bool,
  onChangeTimeRange: PropTypes.func,
  onExpandAllOrders: PropTypes.func.isRequired,
  onShowQuickReport: PropTypes.func,
  onRefresh: PropTypes.func,
  ordersCount: PropTypes.number,
  orderType: PropTypes.oneOf(["activeOrders", "pastOrders"]).isRequired,
  selectedTimeRangeID: PropTypes.string,
};

ShopOrdersToolbar.defaultProps = {
  expandAllOrders: false,
  numOrdersPerRow: 1,
  onChangeTimeRange: () => {},
  onRefresh: () => {},
  ordersCount: 0,
  selectedTimeRangeID: "today",
  showTimeRangePicker: false,
};

export default withContext(MerchantInterfaceConsumer)(ShopOrdersToolbar);
