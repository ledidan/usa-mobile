import React, { Component } from "react";
import PropTypes from "prop-types";
import ShopOrderPill from "../ShopOrdersPill";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Button, Title } from "react-native-paper";

//Style
import Style from "./style";

//Filed
import { PageMsg } from "fields";

//Icons
import { BagIcon } from "assets/Icons";
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

function ShopOrdersList({
  navigation,
  expandAllOrders,
  numOrdersPerRow,
  onAddRefundRequestToPastOrder,
  ordersList,
  ordersType,
  setOrderStatusHasUpdated,
  onSelectScreen,
}) {
  const renderList = ({ item }) => {
    const orderID = item[0];
    const orderInfo = item[0];
    return (
      <View style={[Style.orderPill, { width: `100%` }]} key={orderID}>
        <ShopOrderPill
          onAddRefundRequestToPastOrder={onAddRefundRequestToPastOrder}
          orderID={orderID}
          orderInfo={ordersList[orderID]}
          orderType={ordersType}
          showExpandedInfo={expandAllOrders}
          setOrderStatusHasUpdated={setOrderStatusHasUpdated}
        />
      </View>
    );
  };

  const renderViewPastOrdersButton = () => {
    return (
      <Button
        mode="contained"
        icon={() => (
          <MaterialCommIcon
            name="clipboard-text-outline"
            size={responsiveWidth(2.5)}
            color={"white"}
          />
        )}
        labelStyle={Style.btnLabel}
        style={Style.viewPastOrdersButton}
        onPress={() => onSelectScreen("PastOrders")}>
        View Order History
      </Button>
    );
  };

  return Object.keys(ordersList).length === 0 ? (
    <PageMsg>
      <View style={Style.bagIcon}>
        <BagIcon
          width={responsiveWidth(7)}
          height={responsiveHeight(7)}
          fill="black"
        />
      </View>
      <Title style={Style.title}>
        No {ordersType === "active" ? "Active" : "Completed"} Orders
      </Title>
      <Text style={Style.message}>
        {ordersType === "active" ? "Incoming" : "Fulfilled and Canceled"} orders
        will appear here.
      </Text>
      {ordersType === "active" && renderViewPastOrdersButton()}
    </PageMsg>
  ) : (
    <FlatList
      data={Object.entries(ordersList)}
      keyExtractor={(item, index) => index}
      renderItem={renderList}
      initialNumToRender={15}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Style.container}
    />
  );
}

ShopOrdersList.propTypes = {
  context: PropTypes.shape({
    onChangeGlobalNavItem: PropTypes.func,
  }).isRequired,
  expandAllOrders: PropTypes.bool,
  onAddRefundRequestToPastOrder: PropTypes.func.isRequired,
  ordersList: PropTypes.object,
  numOrdersPerRow: PropTypes.string,
  ordersType: PropTypes.oneOf(["active", "past"]).isRequired,
};

ShopOrdersList.defaultProps = {
  expandAllOrders: false,
  numOrdersPerRow: "1",
  ordersList: {},
  onSelectScreen: () => {},
};

export default withContext(MerchantInterfaceConsumer)(ShopOrdersList);
