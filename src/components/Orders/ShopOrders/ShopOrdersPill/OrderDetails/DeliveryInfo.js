import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Title } from "react-native-paper";

//Style
import Style from "./style";

// Icons
import { DoordashIcon, PostmatesIcon } from "assets/Icons";
import { TouchableOpacity } from "react-native";

export class DeliveryInfo extends Component {
  state = { courierClicksCount: 1 };

  onClickCourier = () => {
    const newClicksCount = this.state.courierClicksCount + 1;
    this.setState(
      { courierClicksCount: newClicksCount },
      () => newClicksCount > 3 && this.props.onShowDeliveryAddress(),
    );
  };

  renderDeliveryDetails = () => {
    const {
      deliverAddress = "",
      deliveryDetails = {},
      orderDeliveryTypeID,
    } = this.props.orderInfo;
    if (orderDeliveryTypeID !== "deliver") return;
    else if (deliverAddress) {
      return (
        <View style={[Style.infoCol, Style.deliveryAddressCol]}>
          <View style={Style.detailHeading}>
            <Title style={Style.heading}>delivery</Title>
          </View>
        </View>
      );
    }
    const { courier, deliveryAddress } = deliveryDetails;
    const { streetAddress1, city, state, zip } = deliveryAddress;

    return (
      <View style={[Style.infoCol, Style.deliveryAddressCol]}>
        <View style={Style.detailHeading}>
          <Title style={Style.heading}>delivery</Title>
        </View>
        <Text>{`${streetAddress1}, ${city}, ${state}, ${zip}`}</Text>
        <View style={Style.fulfilledBy}>
          <Text>Fulfilled by </Text>
          {courier === "postmates" ? (
            <PostmatesIcon width={100} height={30} />
          ) : (
            <DoordashIcon width={100} height={30} />
          )}
        </View>
      </View>
    );
  };
  render() {
    const { orderInfo = {} } = this.props;
    const {
      customerName,
      deliveryDetails = {},
      orderDeliveryTypeID,
      pickUpTime = "ASAP",
    } = orderInfo;
    let courier = "";
    if (orderDeliveryTypeID === "pickUp")
      courier = (
        <Text style={[Style.textWeight, Style.textSize]}>{customerName}</Text>
      );
    else {
      const { courier: deliveryCourier } = deliveryDetails;
      courier =
        deliveryCourier === "postmates" ? (
          <PostmatesIcon width={100} height={30} />
        ) : (
          <DoordashIcon width={100} height={30} />
        );
    }
    return (
      <View style={Style.infoCol}>
        <View style={Style.detailHeading}>
          <Title style={Style.heading}>delivery info</Title>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={[Style.textOpacity, Style.textSize]}>Pickup Time</Text>
          <Text style={[Style.textWeight, Style.textSize]}>{pickUpTime}</Text>
        </View>
        <TouchableOpacity onPress={this.onClickCourier}>
          <Text style={[Style.textOpacity, Style.textSize]}>Pickup By</Text>
          {courier}
        </TouchableOpacity>
      </View>
    );
  }
}

DeliveryInfo.propTypes = {
  onShowDeliveryAddress: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({
    deliveryDetails: PropTypes.shape({
      courier: PropTypes.oneOf(["doordash", "postmates"]).isRequired,
      deliveryAddress: PropTypes.shape({
        streetAddress1: PropTypes.string,
        streetAddress2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zip: PropTypes.string,
      }).isRequired,
    }),
    orderDeliveryTypeID: PropTypes.oneOf(["inStore", "deliver", "pickUp"])
      .isRequired,
    pickUpTime: PropTypes.string,
  }).isRequired,
};

export default DeliveryInfo;
