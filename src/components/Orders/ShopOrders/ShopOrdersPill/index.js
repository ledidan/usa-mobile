import React, { Component } from "react";
import PropTypes from "prop-types";
import { del, set } from "object-path-immutable";
import _get from "lodash.get";
import { View } from "react-native";

import Buttons from "./Buttons";
import PreviewInfo from "./PriviewInfo";
import OrderDetails from "./OrderDetails";
import Receipt from "../../Receipt";

import {
  _createConfirmMsgForCustomer,
  _createOrderReadyMsgForCustomer,
} from "./HelperFunctions";

//Style
import Style from "./style";
// Components
import { Modals } from "components"; //TODO: implement

// Utils
import { _isTrue } from "utils";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Lib
import { Functions, Services, Constants } from "lib";
import OrderMathFuncs from "lib/Functions/OrderMathFuncs";

export class ShopOrderPill extends Component {
  state = {
    showExpandedInfo: false,
    receiptSources: {},
    starIsPrinting: false,
  };
  _isMounted = false;

  componentDidMount = async () => {
    this._isMounted = true;
    const { context, orderInfo } = this.props;
    const { auto_accept_new_order } = context;
    const { status } = orderInfo;
    const { AVERAGE_PREPARATION_TIMES: preparationTimes } = Constants;
    const defaultPrepTime = "timeRange2";
    const { label } = preparationTimes[defaultPrepTime];
    if (auto_accept_new_order && status === "active") {
      setTimeout(
        () =>
          this.onConfirmActiveOrder({
            nextStatus: "confirmed",
            preparationTime: label,
          }),
        6000,
      );
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = () => {
      return;
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.showExpandedInfo !== prevProps.showExpandedInfo) {
      this.setState({ showExpandedInfo: this.props.showExpandedInfo });
    }
  }
  // onCapture = ({ uri, type }) => {
  //   this.setState({
  //     receiptSources: {
  //       [type]: { uri },
  //       ...this.state.receiptSources,
  //     },
  //   });
  // };
  onCapture = ({ uri, type }) => {
    this.setState(
      {
        receiptSources: set(this.state.receiptSources, type, { uri }),
      },
      () => {
        console.log("State updated. Now calling onPrintOrder");
        this.onPrintOrder();
      },
    );
  };

  onPrepForPrinting = () => {
    const { _checkAddedPrinters } = Functions;
    const { context, orderInfo } = this.props;
    const { orderItems = {} } = orderInfo;
    const { addedPrinters } = context;

    if (Object.keys(orderItems).length <= 0) return;
    const { isStarAdded } = _checkAddedPrinters(addedPrinters);
    if (isStarAdded) {
      this.setState({ starIsPrinting: true });
    } else {
      this.onPrintOrder();
    }
  };

  onConfirmActiveOrder = async ({ nextStatus, preparationTime }) => {
    const { ChangeStatusOfActiveOrder } = Services.Merchants.PostRequests;
    this.setState({ isLoading: true });
    const { context, orderID, orderInfo } = this.props;
    const { shopBasicInfo, shopID, addedPrinters } = context;
    const params = { nextStatus, orderID, shopID };

    const { success } = await ChangeStatusOfActiveOrder(params);
    const allowPrintingOrder = Object.keys(addedPrinters).length > 0;
    if (this._isMounted) this.setState({ isLoading: false });

    if (!success) {
      const { ShowConfirmNotif } = Functions;
      ShowConfirmNotif({
        title: "",
        message: "Unable to confirm an order. Please try again.",
        type: "info",
      });
      return;
    }

    if (_isTrue(allowPrintingOrder)) await this.onPrepForPrinting();

    const { customerName, deliveryDetails, orderDeliveryTypeID, phoneNumber } =
      orderInfo;
    if (phoneNumber) {
      const { SendTextMessage } = Services.BUTI.PostRequests;
      await SendTextMessage({
        body: _createConfirmMsgForCustomer({
          customerName,
          deliveryDetails,
          orderDeliveryTypeID,
          preparationTime,
          shopBasicInfo,
        }),
        to: phoneNumber,
      });
    }
    this.setState({ showExpandedInfo: true }, () =>
      context.onChangeActiveOrders(
        set(context.activeOrders, `${orderID}.status`, nextStatus),
      ),
    );
  };

  onCloseActiveOrder = async (params = {}) => {
    const { MoveActiveOrderToPastOrders } = Services.Merchants.PostRequests;
    const { SendTextMessage } = Services.BUTI.PostRequests;
    this.setState({ isLoading: true });
    const { context, orderID, orderInfo, setOrderStatusHasUpdated } =
      this.props;
    const { deliveryDetails, orderDeliveryTypeID, phoneNumber } = orderInfo;
    const { success } = await MoveActiveOrderToPastOrders({
      orderID,
      shopID: context.shopID,
    });
    if (this._isMounted) this.setState({ isLoading: false });
    if (success) setOrderStatusHasUpdated();
    else {
      const { ShowConfirmNotif } = Functions;
      ShowConfirmNotif({
        title: "Warning",
        message: "Failed to close an order. Please try again.",
      });
      return;
    }
    const { sendOrderReadyText = true } = params;
    if (phoneNumber && sendOrderReadyText) {
      await SendTextMessage({
        body: _createOrderReadyMsgForCustomer({
          deliveryDetails,
          orderDeliveryTypeID,
          shopName: _get(this.props.context, "shopBasicInfo.name") || "",
        }),
        to: phoneNumber,
      });
    }
    context.onChangeActiveOrders(del(context.activeOrders, orderID));
  };

  renderTextReceipt = (headerContent, itemsContent) => {
    const [
      shopName,
      orderType,
      tableOrPickupInfo,
      orderNumber,
      orderTime,
      customerName,
      itemCount,
    ] = headerContent;

    const header =
      `${shopName}\n\n` +
      `${orderType} ${tableOrPickupInfo}\n` +
      `Order#: ${orderNumber}\n` +
      `Order Time: ${orderTime}\n` +
      `Customer Name: ${customerName}\n` +
      `Item Count: ${itemCount}\n` +
      `\n`;

    const items = itemsContent
      .map(itemCtnt => {
        const {
          quantity = "",
          itemName = "",
          price = "",
          additions = "",
          guestNote = "",
        } = itemCtnt;
        const { _calcTotalPriceBeforeTaxForItemReceipt } = OrderMathFuncs;
        const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItemReceipt({
          itemCtnt,
        });
        const { additionsDetail = "", additionsPrice = [] } = additions || {};
        const totalAdditionsPrice = additionsPrice.reduce(
          (sum, value) => sum + value,
          0,
        );
        const total = totalPriceBeforeTax.toFixed(2);
        return (
          `------------------------------------------\n` +
          `(${quantity}x) ${itemName.toUpperCase()}\n` +
          (additionsDetail ? `* Additions: ${additionsDetail}\n` : "") +
          `* Price: $${total}\n` +
          (guestNote ? `* Guest Note: ${guestNote}\n` : "") +
          `\n`
        );
      })
      .join("");

    const footer = "\n".repeat(5);

    return header + items + footer;
  };

  constructTextReceipt = () => {
    let { context, orderID, orderInfo } = this.props;
    orderInfo = { ...orderInfo, orderID };
    const { shopBasicInfo } = context;
    const { _generateReceipt } = Functions;
    const { timeZone } = shopBasicInfo;
    const { headerContent, itemsContent } = _generateReceipt({
      orderInfo: { ...orderInfo, shopTimeZone: timeZone },
    });
    return this.renderTextReceipt(headerContent, itemsContent);
  };
  onPrintOrder = async () => {
    const { context, orderID } = this.props;
    const { OrdersManagement } = Functions;
    const { _printOrder } = OrdersManagement;
    const { addedPrinters, BleManager, shopBasicInfo } = context;
    const { receiptSources = {} } = this.state;

    if (Object.keys(receiptSources).length >= 0) {
      Promise.resolve().then(() => {
        Object.keys(addedPrinters).forEach(printerID => {
          const printerInfo = addedPrinters[printerID];
          const { printerBrand, printerName, is_active = true } = printerInfo;

          if (is_active) {
            _printOrder({
              printerName,
              printerInfo,
              printerBrand,
              orderID,
              BleManager,
              shopBasicInfo,
              receiptSources:
                printerBrand === "epson" || printerBrand === "others"
                  ? this.constructTextReceipt()
                  : receiptSources,
            });
          }
        });
      });
    } else {
      const { ShowConfirmNotif } = Functions;
      ShowConfirmNotif({
        title: "Warning",
        message: "Failed print. Please try again.",
      });
    }

    this.setState({
      starIsPrinting: false,
      receiptSources: {},
    });
  };

  onRefundRequestSuccess = ({ refund_request_id, request_details }) =>
    this.setState({ showRefundModal: false }, () =>
      this.props.onAddRefundRequestToPastOrder({
        orderId: this.props.orderID,
        refund_request_id,
        request_details,
      }),
    );

  renderContent = () => {
    const { showExpandedInfo, starIsPrinting } = this.state;
    let { orderID, orderInfo = {}, orderType } = this.props;
    orderInfo = { ...orderInfo, orderID };
    const { status, orderItems = {} } = orderInfo;
    return (
      <View style={Style.orderContainer}>
        <View
          style={[
            Style.orderPreviewBox,
            Style[status || "active"],
            showExpandedInfo && Style.showExpandedInfo,
            this.state.isLoading && Style.isLoading,
          ]}>
          {this.renderPreviewInfo(orderInfo)}
          <Buttons
            isLoading={this.state.isLoading}
            onCloseActiveOrder={this.onCloseActiveOrder}
            onPrintOrder={this.onPrepForPrinting}
            onShowActionsModal={() => this.setState({ showActionsModal: true })}
            onShowConfirmCloseOrder={() =>
              this.setState({ showConfirmCloseOrder: true })
            }
            onShowEstimatePrepTimeModal={() =>
              this.setState({ showEstimatePrepTimeModal: true })
            }
            onShowExpandedInfo={() =>
              this.setState({
                showExpandedInfo: !this.state.showExpandedInfo,
              })
            }
            onShowRefundModal={() => this.setState({ showRefundModal: true })}
            orderInfo={orderInfo}
            orderType={orderType}
            showExpandedInfo={showExpandedInfo}
          />
        </View>
        {starIsPrinting &&
          Object.keys(orderItems).length > 0 &&
          (console.log("Rendering Receipt now"),
          (
            <Receipt
              orderInfo={orderInfo}
              onCapture={this.onCapture}
              type={"star"}
            />
          ))}

        {/* <Receipt
          orderInfo={orderInfo}
          onCapture={this.onCapture}
          type={"epson"}
        /> */}
        {showExpandedInfo && (
          <OrderDetails
            orderID={orderID}
            orderInfo={orderInfo}
            orderType={orderType}
            onShowRefundModal={() => this.setState({ showRefundModal: true })}
          />
        )}
      </View>
    );
  };
  renderPreviewInfo = (orderInfo = {}) => (
    <PreviewInfo
      onArrowBtnClick={() =>
        this.setState({ showExpandedInfo: !this.state.showExpandedInfo })
      }
      orderInfo={orderInfo}
      orderType={this.props.orderType}
      showExpandedInfo={this.state.showExpandedInfo}
    />
  );
  render() {
    const {
      showConfirmCloseOrder,
      showEstimatePrepTimeModal,
      showRefundModal,
      starIsPrinting,
    } = this.state;
    const { orderInfo, context } = this.props;
    const { auto_accept_new_order } = context;
    const { orderDeliveryTypeID, pickUpTime = "", refundRequests } = orderInfo;
    return (
      <React.Fragment>
        {showEstimatePrepTimeModal && (
          <Modals.SelectEstimatePrepTimeModal
            onAcceptOrder={({ preparationTime }) =>
              this.onConfirmActiveOrder({
                nextStatus: "confirmed",
                preparationTime,
              })
            }
            onPrintOrder={this.onPrepForPrinting}
            onCloseModal={() =>
              this.setState({ showEstimatePrepTimeModal: false })
            }
            orderInfo={orderInfo}
            auto_accept_new_order={auto_accept_new_order}
          />
        )}
        {showConfirmCloseOrder && (
          <Modals.ConfirmCloseOrderModal
            onCloseModal={() => this.setState({ showConfirmCloseOrder: false })}
            onClosePickupOrder={this.onCloseActiveOrder}
            orderDeliveryTypeID={orderDeliveryTypeID}
            pickUpTime={pickUpTime}
          />
        )}
        {showRefundModal && (
          <Modals.ConfirmRefundOrderModal
            onCloseModal={() => this.setState({ showRefundModal: false })}
            onRefundRequestSuccess={this.onRefundRequestSuccess}
            orderID={this.props.orderID}
            orderInfo={orderInfo}
            refundRequests={refundRequests}
          />
        )}

        {this.renderContent()}
      </React.Fragment>
    );
  }
}
ShopOrderPill.propTypes = {
  context: PropTypes.shape({
    activeOrders: PropTypes.object,
    addedPrinters: PropTypes.object,
    onChangeActiveOrders: PropTypes.func.isRequired,
    printerQZConfigs: PropTypes.object, //TODO: CHECK THIS
    shopBasicInfo: PropTypes.object.isRequired,
    shopID: PropTypes.string.isRequired,
  }).isRequired,
  onAddRefundRequestToPastOrder: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired,
  orderInfo: PropTypes.shape({
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
  showExpandedInfo: PropTypes.bool,
};

ShopOrderPill.defaultProps = {
  onChangeOrderStatus: () => {},
  showExpandedInfo: false,
};
export default withContext(MerchantInterfaceConsumer)(ShopOrderPill);
