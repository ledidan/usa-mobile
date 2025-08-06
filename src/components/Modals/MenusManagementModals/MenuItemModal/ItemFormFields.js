import React, { Component } from "react";
import { View } from "react-native";
import _get from "lodash.get";
import * as immutable from "object-path-immutable";

import {
  _getSubmitBtnStatus,
  _vetItemInfoBeforeSubmit,
  _createEmailContent,
} from "./HelperFunctions";

import {
  _findSelectedCheckboxOptionIDs,
  _findSelectedRadioOptionID,
} from "components/Modals/MenusManagementModals/HelperFunctions";

// Context
import { MerchantInterfaceConsumer, withContext } from "context";

//component
import {} from "components"; //MenuManagement Modules

//field
import { CheckboxGroup, SwitchItem, Input } from "fields";
const { TextInput } = Input;

// Lib
import { Constants, Services } from "lib";

//style
import FieldStyle from "components/Modals/style";
import * as Sentry from "@sentry/react-native";

export class ItemFormFields extends Component {
  state = {
    inputErrors: {},
    itemInfo: this.props.itemInfo,
  };
  componentDidMount = () => this.setState({ itemInfo: this.props.itemInfo });

  onClickCheckbox = (fieldID, optionID) => {
    const { itemInfo } = this.state;
    const path = `${fieldID}.${optionID}`;
    this.setState({
      itemInfo: !_get(itemInfo, path)
        ? immutable.set(itemInfo, path, "checked")
        : immutable.del(itemInfo, path),
    });
  };

  onClickRadioButton = (fieldID, optionID) => {
    const { itemInfo } = this.state;
    const result = immutable.set(itemInfo, fieldID, { [optionID]: "checked" });
    this.setState({ itemInfo: result });
  };
  onSwitch = ({ fieldID, optionID }) => {
    const { itemInfo } = this.state;
    const { itemName = "" } = itemInfo;
    const { PostRequests } = Services.BUTI;
    const { SendEmail } = PostRequests;
    const { personnel = {}, shopBasicInfo = {} } = this.props;
    const { id = "" } = shopBasicInfo;
    const result = immutable.set(itemInfo, fieldID, { [optionID]: "checked" });
    const { subject = "", body = "" } = _createEmailContent({
      personnel,
      shopBasicInfo,
      optionID,
      itemName,
    });
    SendEmail({
      addresses: ["support@skiplinow.com"],
      subject,
      body,
      shop_id: id,
    })
      .then(() =>
        this.setState({ itemInfo: result }, () => this.onSubmitForm()),
      )
      .catch(err =>
        Sentry.captureException(err, {
          extra: {
            message: "Error send email for item switch",
            itemInfo: result,
          },
        }),
      );
  };

  onGetReadOnlyStatus = fieldID => {
    if (this.props.isReadOnly) return true;
    else if (this.props.isInEditMode) {
      const role = _get(this.props.context, "personnel.role");
      if (role === "owner") return false;
      else {
        if (
          [
            "itemName",
            "itemKitchenChitName",
            "itemIsOnSale",
            "itemPrice",
          ].includes(fieldID)
        )
          return true;
        return false;
      }
    }
    return false;
  };

  onSubmitForm = () =>
    this.props.onSubmit(
      _vetItemInfoBeforeSubmit({ itemInfo: this.state.itemInfo }),
    );

  renderField = (field = {}) => {
    const { inputErrors = {}, itemInfo = {} } = this.state;
    const { fieldKind, id, placeholder, type, rows, required, ...rest } = field;
    switch (fieldKind) {
      case "checkboxes":
        return (
          <View style={FieldStyle.radioForm} key={id}>
            <CheckboxGroup
              heading={field.label || ""}
              options={field.options || {}}
              required={field.required || false}
              selectedOptionIDs={_findSelectedCheckboxOptionIDs(
                itemInfo[id] || {},
              )}
              readOnly={true}
            />
          </View>
        );
      case "radio":
        return null;
      case "switch":
        return (
          <View style={FieldStyle.radioForm} key={id}>
            <SwitchItem
              label={field.label}
              required={required}
              value={_findSelectedRadioOptionID(itemInfo[id]) === "true"}
              selectedOptionID={_findSelectedRadioOptionID(itemInfo[id])}
              onSwitch={({ optionID }) =>
                this.onSwitch({ optionID, fieldID: id })
              }
              {...rest}
            />
          </View>
        );

      case "text":
      case "textarea":
        if (id === "itemSaleRate") {
          const { itemIsOnSale = { false: "checked" } } = this.state.itemInfo;
          if (itemIsOnSale.false) return null;
        }
        return (
          <View style={FieldStyle.formField} key={id} pointerEvents="none">
            <TextInput
              mode="outlined"
              type={fieldKind === "textarea" ? "textarea" : "single"}
              errMsg={inputErrors[id]}
              multiline={fieldKind === "textarea" ? true : false}
              numberOfLines={fieldKind === "textarea" ? rows : 1}
              textAlignVertical="center"
              //disabled
              containerStyle={[
                FieldStyle.inputField,
                fieldKind === "textarea" && FieldStyle.textArea,
              ]}
              defaultValue={`${this.state.itemInfo[id]}` || placeholder}
              value={`${this.state.itemInfo[id]}` || placeholder}
              {...rest}
            />
          </View>
        );
      default:
        return null;
    }
  };
  render() {
    const { NEW_ITEM_FIELDS } = Constants;
    return <View>{NEW_ITEM_FIELDS.map(this.renderField)}</View>;
  }
}

export default withContext(MerchantInterfaceConsumer)(ItemFormFields);
