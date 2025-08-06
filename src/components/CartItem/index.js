import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import Modifiers from "./Modifiers";

//Style
import Style from "./style";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Lib
import { Functions, Services } from "lib";

export class CartItem extends Component {
  state = { showItemDetails: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.onGetItemInfo();
  }

  componentWillUnmount() {
    this.setState({ showItemDetails: false });
    this._isMounted = false;
    this.setState = () => {
      return;
    };
  }

  onGetItemInfo = async () => {
    if (!this.state.itemInfo) {
      const { Merchants } = Services;
      const { GetMenuItemInformation } = Merchants.GetRequests;
      const { shopID = "" } = this.props.context;
      if (shopID) {
        const { itemID } = this.props.detailsOfItemInCart;
        const { itemInfo } = await GetMenuItemInformation({
          itemID,
          shopID,
        }).catch(() => this.setState({ itemInfo: null }));
        if (itemInfo && this._isMounted) this.setState({ itemInfo });
      }
    }
  };

  onHideItemDetails = () => this.setState({ showItemDetails: false });

  onShowItemDetails = () => this.setState({ showItemDetails: true });

  renderOnSaleAmount = itemSaleRate => (
    <View style={[Style.itemExtraInfo, { marginBottom: 5 }]}>
      <Text Style={Style.discount}>{itemSaleRate}% discount applied</Text>
    </View>
  );

  renderItemInfoColumn = () => {
    const { detailsOfItemInCart } = this.props;
    const {
      customerInstruction = "",
      itemIsOnSale = false,
      itemSaleRate = 0,
      itemSimpleDescription = {},
      quantity = 1,
    } = detailsOfItemInCart;
    const { itemKitchenChitName = "", itemName = "" } = itemSimpleDescription;
    return (
      <View style={Style.itemInfoColumn}>
        <View style={Style.itemDetailsColumn}>
          <Text style={Style.itemName}>
            {`(${quantity} x) `} {itemKitchenChitName || itemName}
          </Text>
          {itemIsOnSale && this.renderOnSaleAmount(itemSaleRate)}
          <View style={Style.itemExtraInfo}>
            <Modifiers modifierGroups={detailsOfItemInCart.modifierGroups} />
          </View>
          {!!customerInstruction && (
            <View style={[Style.itemExtraInfo, Style.customerInstruction]}>
              <Text style={Style.guestNote}>Note from guest: </Text>
              <Text style={[Style.mark]}>{customerInstruction}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  renderPriceColumn = () => {
    const { OrderMathFuncs } = Functions;
    const { _calcTotalPriceBeforeTaxForItem } = OrderMathFuncs;
    const { detailsOfItemInCart = {} } = this.props;
    const { totalPriceBeforeTax } = _calcTotalPriceBeforeTaxForItem({
      detailsOfItemInCart,
    });
    return (
      <View style={Style.priceCol}>
        <Text style={Style.price}>${totalPriceBeforeTax.toFixed(2)}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={Style.itemInCart}>
        {this.renderItemInfoColumn()}
        {this.renderPriceColumn()}
      </View>
    );
  }
}

CartItem.propTypes = {
  context: PropTypes.shape({ shopID: PropTypes.string }),
  detailsOfItemInCart: PropTypes.shape({
    customerInstruction: PropTypes.string,
    itemID: PropTypes.string.isRequired,
    itemSimpleDescription: PropTypes.shape({
      itemKitchenChitName: PropTypes.string,
      itemName: PropTypes.string.isRequired,
      itemPrice: PropTypes.any,
    }),
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default withContext(MerchantInterfaceConsumer)(CartItem);
