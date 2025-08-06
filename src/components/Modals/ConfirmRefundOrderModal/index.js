import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import NewRefundRequest from "./NewRefundRequest";
import RefundRequests from "./RefundRequests";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Style
import Style from "./style";

//field
import { Modal, Strong } from "fields";

export class ConfirmRefundOrderModal extends Component {
  state = {};

  componentDidMount = () => {
    const { orderInfo = {} } = this.props;
    const { refundRequests = {} } = orderInfo;
    this.setState({
      showRefundRequests: Object.keys(refundRequests).length > 0,
    });
  };
  onGetModalHeader = () =>
    this.state.showRefundRequests ? "Past Requests" : "New Request";

  renderContent = () => {
    const { orderID = "", orderInfo = {} } = this.props;
    const { customerName, refundRequests = {} } = orderInfo;
    const {
      shopID = "",
      shopBasicInfo = {},
      personnel = {},
    } = this.props.context;

    if (this.state.showRefundRequests) {
      return (
        <RefundRequests
          customerName={customerName}
          onCloseModal={this.props.onCloseModal}
          onCreateNewRequest={() =>
            this.setState({ showRefundRequests: false })
          }
          orderID={orderID}
          refundRequests={refundRequests}
        />
      );
    }
    return (
      <NewRefundRequest
        {...this.props}
        shopID={shopID}
        personnel={personnel}
        shopBasicInfo={shopBasicInfo}
      />
    );
  };
  render() {
    const { orderInfo = {}, orderID } = this.props;
    const { customerName } = orderInfo;
    return (
      <Modal
        modalStyle={{ modalContainer: Style.modal }}
        contentDescriptionProps={{
          contentDescription: (
            <View className={Style.orderInfo}>
              <Text style={Style.contentDescText}>
                Customer: <Strong>{customerName}</Strong>
              </Text>
              <Text style={Style.contentDescText}>
                Order Id: <Strong>{orderID}</Strong>
              </Text>
            </View>
          ),
          showContentDescription: true,
          title: "Refunds take 5-10 days to appear on a customer's statement",
        }}
        contentLabel="Refund order"
        headerProps={{ header: this.onGetModalHeader() }}
        onCloseModal={this.props.onCloseModal}>
        {this.renderContent()}
      </Modal>
    );
  }
}
ConfirmRefundOrderModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onRefundRequestSuccess: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  orderInfo: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    orderDeliveryTypeID: PropTypes.oneOf(["inStore", "deliver", "pickUp"])
      .isRequired,
    orderItems: PropTypes.object.isRequired,
    paymentIntentID: PropTypes.string,
    phoneNumber: PropTypes.string,
    timeStamp: PropTypes.string.isRequired,
    totalPriceAfterTax: PropTypes.any.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  refundRequests: PropTypes.object,
};

export default withContext(MerchantInterfaceConsumer)(ConfirmRefundOrderModal);
