import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import * as immutable from "object-path-immutable";
import { Text, View, Image } from "react-native";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

// Utils
import { _roundNumber } from "utils";

//Style
import CommonStyle, { chipHeight, addImageIconSize } from "../style";
import Style from "./style";

//Icon
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AddPhoto, PencilIcon } from "assets/Icons";

// Lib
import BUTI from "lib/Services/BUTI";
import { Title } from "react-native-paper";

//fields
import { Chip } from "fields";

//Component
import { Modals } from "components";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class Item extends Component {
  state = {};
  componentDidMount = () => this.setState({ itemInfo: this.props.itemInfo });

  onChangeItemImage = async imageURL => {
    const image = { imageURL };
    const { success } = await BUTI.PostRequests.ChangeMenuItemImage({
      image,
      itemID: this.props.itemInfo,
      shopID: this.props.shopID,
    });
    if (success) {
      this.onUpdateItemImageAfterSaved(image);
      this.onHideChangePhotoModal();
    }
  };

  onGetItemImage = () => _get(this.state.itemInfo, "itemImages.full") || {};

  onHideChangePhotoModal = () => this.setState({ showChangePhotoModal: false });

  onHideEditItemModal = () => this.setState({ showEditItemModal: false });

  onShowChangePhotoModal = () => this.setState({ showChangePhotoModal: true });

  onShowEditItemModal = () => this.setState({ showEditItemModal: true });

  onUpdateAfterItemArchived = ({ shouldArchiveItem = false }) => {
    const { itemInfo } = this.state;
    this.setState({
      itemInfo: immutable.set(itemInfo, "itemIsArchived", shouldArchiveItem),
    });
  };

  onUpdateAfterItemSaved = ({ itemInfo }) => this.setState({ itemInfo });

  onUpdateItemImageAfterSaved = (newImage = "") =>
    this.setState({
      itemInfo: immutable.set(this.state.itemInfo, "itemImages.full", newImage),
    });
  renderChipAvatar = () => {
    const { imageURL } = this.onGetItemImage();
    return imageURL ? (
      <Image source={{ uri: imageURL }} style={CommonStyle.avatar} />
    ) : (
      <AddPhoto
        name="image-plus"
        width={addImageIconSize}
        height={addImageIconSize}
      />
    );
  };
  renderChipLabel = () => {
    const { itemInfo } = this.state;
    const { itemPrice } = itemInfo;
    const modifierGroupsCount = Object.keys(
      itemInfo.modifierGroups || {},
    ).length;
    return (
      <React.Fragment>
        <Title style={CommonStyle.chipName} numberOfLines={1}>
          {itemInfo.itemName}
        </Title>
        <View style={Style.chipDescription}>
          <Text style={[Style.itemPrice, Style.marginRight]}>
            {itemPrice && `$${_roundNumber(itemPrice).toFixed(2)}`}
          </Text>
          {modifierGroupsCount > 0 && (
            <Text style={[CommonStyle.elementsCounter, Style.marginRight]}>
              {modifierGroupsCount} mod. group
              {modifierGroupsCount !== 1 ? "s" : ""}
            </Text>
          )}
        </View>
      </React.Fragment>
    );
  };

  renderHelperButton = () => {
    const { itemHelperButton } = this.props;
    if (itemHelperButton) return itemHelperButton(this.props.itemID);
    return (
      <MaterialComIcon
        name="pencil"
        size={responsiveWidth(2.5)}
        style={CommonStyle.pencilIcon}
        onPress={this.onShowEditItemModal}
      />
    );
  };
  renderEditModal = () => (
    <Modals.MenuItemModal
      isInEditMode={this.props.isInEditMode}
      itemID={this.props.itemID}
      itemInfo={this.state.itemInfo}
      isReadOnly
      onCloseModal={this.onHideEditItemModal}
      onUpdateAfterItemArchived={this.onUpdateAfterItemArchived}
      onUpdateAfterItemSaved={this.onUpdateAfterItemSaved}
    />
  );

  renderItem = () => (
    <View style={CommonStyle.chipContainer}>
      <Chip
        avatar={this.renderChipAvatar}
        label={this.renderChipLabel}
        onPressAvatar={() => {
          // this.props.allowChangeItemPhoto && this.onShowChangePhotoModal()
        }}
        onPressLabel={this.onShowEditItemModal}
        onPressHelpButton={this.onShowEditItemModal}
        helperButtonContent={this.renderHelperButton}
      />
      {this.renderSigns()}
    </View>
  );
  renderSigns = () => {
    const {
      itemIsArchived = false,
      itemIsOutOfStock = {},
      itemIsOnSale = {},
      itemSaleRate = 0,
    } = this.state.itemInfo;
    if (itemIsArchived)
      return (
        <View style={CommonStyle.signsContainer}>
          <Text style={[CommonStyle.sign, CommonStyle.archivedSign]}>
            Archived
          </Text>
        </View>
      );
    if (itemIsOutOfStock.true || itemIsOnSale.true)
      return (
        <View style={CommonStyle.signsContainer}>
          {itemIsOutOfStock.true && (
            <Text style={[CommonStyle.sign, CommonStyle.soldOutSign]}>
              Sold Out
            </Text>
          )}
          {itemIsOnSale.true && (
            <Text style={[CommonStyle.sign, CommonStyle.onSaleSign]}>
              On Sale ({itemSaleRate || 0}%)
            </Text>
          )}
        </View>
      );
    return null;
  };
  render() {
    return (
      <React.Fragment>
        {this.state.showEditItemModal && this.renderEditModal()}
        {this.state.itemInfo && this.renderItem()}
      </React.Fragment>
    );
  }
}
Item.propTypes = {
  allowChangeItemPhoto: PropTypes.bool,
  context: PropTypes.shape({ shopID: PropTypes.string.isRequired }).isRequired,
  isInEditMode: PropTypes.bool,
  itemHelperButton: PropTypes.func,
  itemID: PropTypes.string.isRequired,
  itemInfo: PropTypes.shape({ itemName: PropTypes.string }).isRequired,
};

Item.defaultProps = {
  allowChangeItemPhoto: true,
  isInEditMode: true,
};
export default withContext(MerchantInterfaceConsumer)(Item);
