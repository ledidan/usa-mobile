import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { _getChangeStatusButton } from "./helperFunctions";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Utils
import { _isTrue } from "utils";

// Icons
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";

// Style
import Style from "./style";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ICON_SIZE = responsiveWidth(2);
export class ShopOrderPillButtons extends Component {
  state = { printingOrder: false };
  onGetChangeStatusButton = orderCurrentStatus => {
    const { orderInfo = {} } = this.props;
    const { orderDeliveryTypeID } = orderInfo;
    return _getChangeStatusButton({
      checkIcon: (
        <View style={Style.checkIcon}>
          <MaterialCommIcon name="check" size={ICON_SIZE} color="#fff" />
        </View>
      ),
      likeIcon: (
        <View style={Style.likeIcon}>
          <MaterialCommIcon name="thumb-up" size={ICON_SIZE} color="#fff" />
        </View>
      ),
      onCloseActiveOrder: this.props.onCloseActiveOrder,
      onConfirmCloseOrder: this.props.onShowConfirmCloseOrder,
      onShowEstimatePrepTimeModal: this.props.onShowEstimatePrepTimeModal,
      orderCurrentStatus,
      orderDeliveryTypeID,
    });
  };
  renderActiveOrderButtons = () => {
    const { orderInfo = {} } = this.props;
    const { status = "active" } = orderInfo;
    return (
      <View style={Style.container}>
        {this.renderShowDetailsButton(status)}
        {this.renderPrintButton(status)}
        {this.renderChangeStatusBtn(status)}
      </View>
    );
  };

  renderPastOrderButtons = () => {
    const { orderInfo = {} } = this.props;
    const { status = "active" } = orderInfo;
    return (
      <View style={Style.container}>
        {this.renderShowDetailsButton(status)}
        {this.renderRefundButton()}
        {this.renderPrintButton(status)}
      </View>
    );
  };

  renderChangeStatusBtn = orderCurrentStatus => {
    const { isLoading } = this.props;
    const { buttonAction, icon, loadingText, name, nextStatus, text } =
      this.onGetChangeStatusButton(orderCurrentStatus);
    return (
      <Button
        mode="contained"
        color="black"
        labelStyle={Style.btnLabel}
        style={[
          Style.button,
          Style.changeOrderStatusBtn,
          Style[orderCurrentStatus],
        ]}
        onPress={() => !isLoading && buttonAction({ nextStatus })}
        loading={isLoading}
        disabled={isLoading}
        icon={() => icon}>
        {isLoading ? loadingText : text}
      </Button>
    );
  };
  onReprint() {
    this.setState({ printingOrder: true });
    this.props.onPrintOrder();
    setTimeout(() => {
      this.setState({ printingOrder: false });
    }, 2500);
  }
  renderPrintButton = orderCurrentStatus => {
    const { addedPrinters } = this.props.context;
    if (orderCurrentStatus === "active") return;
    let allowPrintingOrder = Object.keys(addedPrinters).length > 0;
    return (
      _isTrue(allowPrintingOrder) && (
        <Button
          mode="contained"
          color="#fff"
          labelStyle={Style.btnLabel}
          style={Style.button}
          onPress={() => !this.state.printingOrder && this.onReprint()}
          icon={({ color }) => (
            <MaterialCommIcon name="printer" size={ICON_SIZE} />
          )}
          loading={this.state.printingOrder}>
          {this.state.printingOrder ? "Printing" : "Reprint"}
        </Button>
      )
    );
  };

  renderRefundButton = () => (
    <Button
      mode="contained"
      color="#fff"
      labelStyle={Style.btnLabel}
      style={[Style.button]}
      onPress={this.props.onShowRefundModal}
      icon={({ color }) => (
        <MaterialCommIcon
          name="credit-card-refund"
          size={ICON_SIZE}
          color={color}
        />
      )}>
      Refund
    </Button>
  );

  renderShowDetailsButton = () => {
    const { showExpandedInfo } = this.props;
    return (
      <Button
        mode="contained"
        color="#fff"
        labelStyle={Style.btnLabel}
        style={[Style.button, Style.showOrderDetailsButton]}
        onPress={this.props.onShowExpandedInfo}
        icon={({ color }) =>
          showExpandedInfo ? (
            <MaterialCommIcon name="minus" size={ICON_SIZE} color={color} />
          ) : (
            <MaterialCommIcon name="plus" size={ICON_SIZE} color={color} />
          )
        }>
        Details
      </Button>
    );
  };
  render() {
    return this.props.orderType === "active"
      ? this.renderActiveOrderButtons()
      : this.renderPastOrderButtons();
  }
}
ShopOrderPillButtons.propTypes = {
  context: PropTypes.shape({
    shopBasicInfo: PropTypes.shape({
      allowPrintingOrder: PropTypes.any,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCloseActiveOrder: PropTypes.func.isRequired,
  onPrintOrder: PropTypes.func.isRequired,
  onShowActionsModal: PropTypes.func.isRequired,
  onShowConfirmCloseOrder: PropTypes.func.isRequired,
  onShowEstimatePrepTimeModal: PropTypes.func.isRequired,
  onShowExpandedInfo: PropTypes.func.isRequired,
  onShowRefundModal: PropTypes.func.isRequired,
  orderInfo: PropTypes.shape({
    status: PropTypes.oneOf(["active", "confirmed", "closed"]).isRequired,
  }).isRequired,
  orderType: PropTypes.oneOf(["active", "past"]).isRequired,
  showExpandedInfo: PropTypes.bool,
};

ShopOrderPillButtons.defaultProps = {
  isLoading: false,
  showExpandedInfo: false,
};

export default withContext(MerchantInterfaceConsumer)(ShopOrderPillButtons);
