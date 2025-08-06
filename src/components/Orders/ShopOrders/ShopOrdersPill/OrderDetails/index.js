import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Title } from "react-native-paper";

import DeliveryAddress from "./DeliveryAddress";
import DeliveryInfo from "./DeliveryInfo";
import Notices from "./Notices";
import SubTotal from "./SubTotal";

//Style
import Style from "./style";
import colors from "styles/_variables";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Components
import { CartItem } from "components";

// Utils
import { _formatPhoneNumber } from "utils";

// Icons
import { ArrowIcon, PhoneIcon } from "assets/Icons";

// Lib
import { Constants, Functions } from "lib";

//field
import { Input } from "fields";
const { TextInput } = Input;

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export class OrderDetails extends Component {
  state = { showAllInfo: false };

  renderCurbsideInfo = () => {
    const { curbsideInfo = "" } = this.props.orderInfo;
    return (
      !!curbsideInfo && (
        <View style={Style.curbsidePickUp}>
          <TextInput
            mode="outlined"
            label="Curbside (Parking lot # / Car brand + color)"
            style={Style.curbsideInfo}
            multiline
            numberOfLines={2}
            value={curbsideInfo}
            disabled
          />
        </View>
      )
    );
  };
  renderCustomerDetails = () => {
    const { customerName, phoneNumber } = this.props.orderInfo;
    const { PhonecallAction } = Functions;
    return (
      <View style={Style.infoCol}>
        <View style={Style.detailHeading}>
          <Title style={Style.heading}>customer info</Title>
        </View>
        <Text style={Style.textSize}>{customerName}</Text>

        <TouchableOpacity
          style={Style.customerPhoneNumber}
          onPress={() => PhonecallAction(phoneNumber)}>
          <PhoneIcon
            width={responsiveWidth(2.5)}
            height={responsiveHeight(2.5)}
            fill={colors.info}
          />
          <TouchableOpacity
            style={Style.customerPhoneNumber}
            onPress={() => PhonecallAction(phoneNumber)}>
            <Text style={[Style.phoneNumber, Style.textSize]}>
              {_formatPhoneNumber(phoneNumber)}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  renderOrderItems = () => {
    const { orderItems = {} } = this.props.orderInfo;
    return Object.entries(orderItems).map(entry => (
      <View key={entry[0]}>
        <CartItem detailsOfItemInCart={entry[1]} />
      </View>
    ));
  };

  renderShowMoreInfoButton = () => {
    const { showAllInfo = false } = this.state;
    return (
      false && (
        <Button
          style={Style.showMoreDetailsButton}
          onPress={() => this.setState({ showAllInfo: !showAllInfo })}>
          {!showAllInfo ? (
            <React.Fragment>
              More Details <ArrowIcon width={20} height={20} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ArrowIcon width={20} height={20} />
              Less Details
            </React.Fragment>
          )}
        </Button>
      )
    );
  };
  renderSubmittedTime = () => {
    const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;

    const { orderInfo } = this.props;
    const { timeStamp } = orderInfo;
    const { timeZone } = this.props.context.shopBasicInfo;
    const submittedDate = formatToTimeZone(timeStamp, DATE_FORMAT, {
      timeZone: timeZone || DEFAULT_TIMEZONE,
    });
    const submittedTime = formatToTimeZone(timeStamp, TIME_FORMAT, {
      timeZone: timeZone || DEFAULT_TIMEZONE,
    });
    return (
      <View style={Style.infoCol}>
        <View style={Style.detailHeading}>
          <Title style={Style.heading}>received at</Title>
        </View>
        <Text style={Style.textSize}>{submittedDate}</Text>
        <Text style={Style.textSize}>{submittedTime}</Text>
      </View>
    );
  };
  render() {
    const { OrderMathFuncs } = Functions;
    const { _calcTotalItemsCount } = OrderMathFuncs;
    const { orderID, orderInfo = {} } = this.props;
    const {
      deliveryDetails = {},
      orderItems = {},
      orderDeliveryTypeID,
      refundRequests = {},
      status,
    } = orderInfo;
    const itemsCount = _calcTotalItemsCount({ orderItems });
    return (
      <View style={[Style.orderDetailsBox, Style[status]]}>
        <Notices
          onShowRefundModal={this.props.onShowRefundModal}
          refundRequests={refundRequests}
        />
        <View style={[Style.infoRow, this.state.showAllInfo && Style.showAll]}>
          {this.renderCustomerDetails()}
          {["pickUp", "deliver"].includes(orderDeliveryTypeID) && (
            <DeliveryInfo
              onShowDeliveryAddress={() =>
                this.setState({ showDeliveryAddress: true })
              }
              orderInfo={orderInfo}
            />
          )}
          {this.state.showDeliveryAddress && (
            <DeliveryAddress deliveryDetails={deliveryDetails} />
          )}
          {this.renderSubmittedTime()}
        </View>
        {this.renderShowMoreInfoButton()}
        {this.renderCurbsideInfo()}
        <View style={Style.orderItems}>
          <Title style={Style.h3}>
            {itemsCount} ITEM{itemsCount === 1 ? "" : "S"} IN ORDER (#
            {this.props.orderID})
          </Title>
          {this.renderOrderItems()}
          <SubTotal
            itemsCount={itemsCount}
            orderID={orderID}
            orderInfo={orderInfo}
          />
        </View>
      </View>
    );
  }
}

OrderDetails.propTypes = {
  context: PropTypes.shape({
    shopBasicInfo: PropTypes.object.isRequired,
  }).isRequired,
  onShowRefundModal: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({
    deliverAddress: PropTypes.string,
    deliveryDetails: PropTypes.shape({
      deliveryAddress: PropTypes.object,
    }),
    curbsideInfo: PropTypes.string,
    customerName: PropTypes.string.isRequired,
    orderDeliveryTypeID: PropTypes.oneOf(["deliver", "inStore", "pickUp"])
      .isRequired,
    orderItems: PropTypes.object.isRequired,
    paymentIntentID: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string.isRequired,
    tableNumber: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
    tipAmount: PropTypes.any,
    totalPriceAfterTax: PropTypes.any.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  orderType: PropTypes.oneOf(["active", "past"]).isRequired,
};

export default withContext(MerchantInterfaceConsumer)(OrderDetails);
