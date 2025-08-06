import React, { Component } from "react";
import { Text, View } from "react-native";
import { Subheading } from "react-native-paper";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import StarStyle from "./starStyle";
import EpsonStyle from "./epsonStyle";
// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Lib
import { Functions } from "lib";

export class Receipt extends Component {
  state = { headerContent: [], itemsContent: [], source: "" };
  viewShot = React.createRef(null);
  isStar = this.props.type === "star";
  componentDidMount = () => {
    const { context, orderInfo } = this.props;
    const { _generateReceipt } = Functions;
    const { shopBasicInfo } = context;
    const { timeZone } = shopBasicInfo;
    const { headerContent, itemsContent } = _generateReceipt({
      orderInfo: { ...orderInfo, shopTimeZone: timeZone },
    });
    this.setState({ headerContent, itemsContent });
  };

  componentWillUnmount() {
    releaseCapture(this.state.source);
    this.setState = () => {
      return;
    };
  }
  onCapture = () => {
    console.log("🔍 onCapture CALLED");
    if (!this.viewShot?.current) {
      console.warn("⚠️ ViewShot ref not ready");
      return;
    }
    this.viewShot.current
      .capture()
      .then(uri => {
        console.log(" uri:");
        this.setState({ source: uri });
        this.props.onCapture({ uri, type: this.props.type });
      })
      .catch(err => console.log("❌ Capture ViewShot Failed, Err:", err));
  };

  renderInfo = (label, info) => {
    return (
      <View
        style={
          this.isStar ? StarStyle.infoContainer : EpsonStyle.infoContainer
        }>
        <Text
          style={[
            this.isStar ? StarStyle.OrderDetails : EpsonStyle.OrderDetails,
            StarStyle.boldText,
          ]}>
          {label}
        </Text>
        <Text
          style={
            this.isStar ? StarStyle.OrderDetails : EpsonStyle.OrderDetails
          }>
          {"   "}
          {info}
        </Text>
      </View>
    );
  };
  renderHeaderContent = () => {
    const { headerContent } = this.state;
    return (
      <View
        style={
          this.isStar ? StarStyle.contentContainer : EpsonStyle.contentContainer
        }>
        <Text
          style={[
            this.isStar ? StarStyle.skipli : EpsonStyle.skipli,
            StarStyle.boldText,
            StarStyle.alignTextCenter,
          ]}>
          {headerContent[0]}
        </Text>
        <Text
          style={[
            this.isStar ? StarStyle.deliveryType : EpsonStyle.deliveryType,
            StarStyle.alignTextCenter,
          ]}>
          {headerContent[1] /** label*/}
        </Text>
        <Text
          style={[
            this.isStar ? StarStyle.deliveryType : EpsonStyle.deliveryType,
            StarStyle.alignTextCenter,
          ]}>
          {headerContent[2] /** Delivery Type*/}
        </Text>
        {this.renderInfo("Order#:", headerContent[3])}
        {this.renderInfo("Order Time:", headerContent[4])}
        {this.renderInfo("Customer:", headerContent[5])}
        {this.renderInfo("Item Count:", `${headerContent[6]}`)}
      </View>
    );
  };
  renderBodyContent = () => {
    const { itemsContent } = this.state;
    const itemStyle = this.isStar ? StarStyle.itemStyle : EpsonStyle.itemStyle;
    const captionStyle = this.isStar ? StarStyle.caption : EpsonStyle.caption;
    return itemsContent.map((itemCtnt, idx) => {
      const {
        quantity = "",
        itemName = "",
        price = "",
        additions = {},
        guestNote = "",
        itemIsOnSale,
        itemSaleRate,
      } = itemCtnt;
      // const { additionsDetail = "", additionsPrice = [] } = additions;
      // const totalAdditionsPrice = additionsPrice.reduce(
      //   (sum, value) => value + sum,
      //   0,
      // );
      // const discountValue = itemIsOnSale
      //   ? (
      //       (Number(price.replace("$", "")) + totalAdditionsPrice) *
      //       (itemSaleRate / 100)
      //     ).toFixed(2)
      //   : 0;
      // const itemPriceWithAdditions = (
      //   Number(price.replace("$", "")) + totalAdditionsPrice
      // ).toFixed(2);
      // const total = (
      //   (itemPriceWithAdditions - discountValue) *
      //   Number(quantity)
      // ).toFixed(2);
      const { additionsDetail = "" } = additions;
      const { OrderMathFuncs } = Functions;
      const { _calcTotalPriceBeforeTaxForItemReceipt } = OrderMathFuncs;
      const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItemReceipt({
        itemCtnt,
      });
      return (
        <View
          key={`${itemName} - ${idx}`}
          style={
            this.isStar
              ? StarStyle.contentContainer
              : EpsonStyle.contentContainer
          }>
          {this.isStar ? (
            <Text style={captionStyle}>===============================</Text>
          ) : (
            <Text style={captionStyle}>
              ==============================================
            </Text>
          )}
          <Text style={[itemStyle, StarStyle.boldText]}>
            {`(${quantity}x) ${itemName}`}{" "}
          </Text>
          {additions ? (
            <Text style={captionStyle}>
              <Text style={StarStyle.boldText}>Additions:</Text>{" "}
              {additionsDetail}
            </Text>
          ) : null}
          <Text style={itemStyle}>
            <Text style={StarStyle.boldText}>Price: </Text>
            {`$${totalPriceBeforeTax.toFixed(2)}`}
          </Text>
          <Text style={captionStyle}>{""}</Text>
          {guestNote ? (
            <Text style={captionStyle}>
              <Text style={StarStyle.boldText}>Guest Note:</Text>{" "}
              {`${guestNote}`}
            </Text>
          ) : null}
        </View>
      );
    });
  };
  render() {
    return (
      <ViewShot
        ref={this.viewShot}
        style={
          this.isStar
            ? StarStyle.viewShotContainer
            : EpsonStyle.viewShotContainer
        }
        onLayout={this.onCapture}
        options={{
          format: "jpg",
          quality: 1,
          result: "base64",
        }}>
        {this.renderHeaderContent()}
        {this.renderBodyContent()}
        <Text style={this.isStar ? StarStyle.caption : EpsonStyle.caption}>
          {""}
        </Text>
      </ViewShot>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(Receipt);
