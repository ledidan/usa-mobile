import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import colors from "styles/_variables";

//Style
import Style from "./style";

//Field
import { Modal, Strong } from "fields";

// Lib
import { Constants } from "lib";

// Icons
import { DoordashIcon, PostmatesIcon } from "assets/Icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export class SelectEstimatePrepTimeModal extends Component {
  state = { selectedTimeId: "timeRange2" };
  onAcceptOrder = async () => {
    const { AVERAGE_PREPARATION_TIMES: preparationTimes } = Constants;
    const { label } = preparationTimes[this.state.selectedTimeId];
    const { auto_accept_new_order = false } = this.props;
  
    if (!auto_accept_new_order) {
      await this.props.onPrintOrder();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  
    this.props.onAcceptOrder({ preparationTime: label });
    this.props.onCloseModal();
  };
  
  renderOrderInfo = () => {
    const { orderInfo = {} } = this.props;
    const {
      customerName,
      deliveryDetails = {},
      orderDeliveryTypeID,
      pickUpTime = "ASAP",
      tableNumber,
    } = orderInfo;
    let extraInfo;

    if (orderDeliveryTypeID === "inStore") {
      extraInfo = (
        <View style={Style.pickUpBy}>
          <Text style={Style.pickUpByText}>
            Table: <Strong>{tableNumber}</Strong>
          </Text>
        </View>
      );
    } else {
      let courier = "";
      if (orderDeliveryTypeID === "pickUp")
        courier = <Strong>{customerName}</Strong>;
      else {
        const { courier: deliveryCourier } = deliveryDetails;
        courier =
          deliveryCourier === "postmates" ? (
            <View style={Style.courier}>
              <PostmatesIcon
                width={responsiveWidth(8)}
                height={responsiveHeight(3)}
              />
            </View>
          ) : (
            <View style={Style.courier}>
              <DoordashIcon
                width={responsiveWidth(8)}
                height={responsiveHeight(3)}
              />
            </View>
          );
      }
      extraInfo = (
        <View style={Style.pickUpBy}>
          <Text style={Style.pickUpByText}>Pickup By: </Text>
          {courier}
        </View>
      );
    }
    return (
      <View style={Style.orderInfo}>
        <View style={Style.pickUpTime}>
          <Text style={{ fontSize: responsiveFontSize(1) }}>
            Pickup Time:{" "}
            <Strong style={Style.pickUpTimeText}>{pickUpTime}</Strong>
          </Text>
        </View>
        <View>{extraInfo}</View>
      </View>
    );
  };

  renderOptions = () => {
    const { AVERAGE_PREPARATION_TIMES: preparationTimes } = Constants;
    return Object.keys(preparationTimes).map(id => {
      const { label } = preparationTimes[id];
      return (
        <View style={Style.option} key={id}>
          <RadioButton
            color={colors.primary}
            value={label}
            status={this.state.selectedTimeId === id ? "checked" : "unchecked"}
            onPress={() => this.setState({ selectedTimeId: id })}
          />
          <Text style={{ fontSize: responsiveFontSize(1) }}>{label}</Text>
        </View>
      );
    });
  };
  render() {
    return (
      <Modal
        modalStyle={{
          modalContainer: { marginHorizontal: "25%", height: "60%" },
        }}
        contentDescriptionProps={{
          contentDescription:
            "Let the guest know how long it takes to prepare this order",
          showContentDescription: true,
        }}
        contentLabel="Select estimate preparation time"
        headerProps={{ header: "Preparation time" }}
        onCloseModal={this.props.onCloseModal}>
        {this.renderOrderInfo()}
        <View style={Style.options}>{this.renderOptions()}</View>
        <Button
          mode="contained"
          labelStyle={Style.submitBtnLabel}
          style={Style.submitButton}
          onPress={this.onAcceptOrder}>
          Submit
        </Button>
      </Modal>
    );
  }
}
SelectEstimatePrepTimeModal.propTypes = {
  onAcceptOrder: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({
    orderDeliveryTypeID: PropTypes.oneOf(["inStore", "pickUp", "deliver"])
      .isRequired,
    pickUpTime: PropTypes.string,
    tableNumber: PropTypes.string,
  }).isRequired,
};

export default SelectEstimatePrepTimeModal;
