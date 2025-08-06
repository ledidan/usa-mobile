import React, { Component } from "react";
import { Title } from "react-native-paper";
import * as Sentry from "@sentry/react-native";

import ItemFormFields from "./ItemFormFields";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

//Fields
import { SideModal } from "fields";

// Lib
import { Functions, Services } from "lib";
import { responsiveWidth } from "react-native-responsive-dimensions";

//Style
import CommonStyle from "../style";

export class MenuItemModal extends Component {
  state = { showLoading: false };

  componentWillUnmount = () => {
    this.setState({ showLoading: false });
    this.setState = () => {
      return;
    };
  };

  onArchiveItem = ({ shouldArchiveItem = false }) => {
    const { Merchants } = Services;
    const { ArchiveItem } = Merchants.PostRequests;
    const { ShowConfirmNotif } = Functions;
    this.setState({ showLoading: true });
    const { context, itemID } = this.props;
    const { shopID } = context;
    ArchiveItem({ itemID, shouldArchiveItem, shopID })
      .then(() => {
        ShowConfirmNotif({
          message: `${shouldArchiveItem ? "Archived" : "Restored"} ${
            this.props.itemInfo.itemName
          }`,
          type: "success",
          options: { visibilityTime: 3000, autoHide: true },
        });
        this.props.onCloseModal();
        this.props.onUpdateAfterItemArchived({ shouldArchiveItem });
      })
      .catch(() => {
        ShowConfirmNotif({
          message: "An error has occured. Please try again.",
          type: "error",
          options: { visibilityTime: 3000, autoHide: true },
          props: { displayType: "error" },
        });
      });
  };

  onSaveItem = async itemInfo => {
    const { Merchants } = Services;
    const { SaveChangedItemInfo } = Merchants.PostRequests;
    this.setState({ showLoadingModal: true });
    const { itemID } = this.props;
    const params = { itemID, itemInfo, shopID: this.props.context.shopID };
    const { sanitizedItemInfo } = await SaveChangedItemInfo(params);
    if (sanitizedItemInfo) {
      this.props.onUpdateAfterItemSaved({ itemInfo: sanitizedItemInfo });
      return true;
    }
    return false;
  };

  onSubmitItemInfo = async itemInfo => {
    const { ShowConfirmNotif } = Functions;
    const { isInEditMode } = this.props;
    const res = await (isInEditMode
      ? this.onSaveItem(itemInfo)
      : this.onCreateItem(itemInfo));
    if (res) {
      ShowConfirmNotif({
        message: `${isInEditMode ? "Saved" : "Created"} ${itemInfo.itemName}`,
        type: "success",
        options: { visibilityTime: 3000, autoHide: true },
      });
      this.props.onCloseModal();
    } else {
      Sentry.captureMessage("Error saving item info in MenuItemModal", {
        extra: { itemInfo },
      });
      ShowConfirmNotif({
        message: "An error has occured. Please try again.",
        type: "error",
        options: { visibilityTime: 3000, autoHide: true },
        props: { displayType: "error" },
      });
    }
  };

  renderModalTitle = () => {
    if (this.props.isReadOnly)
      return <Title style={CommonStyle.modalTitle}>Item Information</Title>;
    return (
      <Title style={CommonStyle.modalTitle}>
        {this.props.isInEditMode ? "Edit" : "Create"} Item
      </Title>
    );
  };
  render() {
    const { isInEditMode, isReadOnly, itemInfo, context } = this.props;
    const { personnel = {}, shopBasicInfo = {} } = context;
    return (
      <SideModal
        side="right"
        header_title="Edit item"
        contentLabel="Create or edit item modal"
        onCloseModal={this.props.onCloseModal}
        containerStyle={{ width: responsiveWidth(60), paddingBottom: 20 }}>
        {this.renderModalTitle()}
        <ItemFormFields
          isInEditMode={isInEditMode}
          isReadOnly={isReadOnly}
          itemInfo={itemInfo}
          onSubmit={this.onSubmitItemInfo}
          shopBasicInfo={shopBasicInfo}
          personnel={personnel}
        />
      </SideModal>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(MenuItemModal);
