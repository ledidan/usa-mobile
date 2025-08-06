import React, { Component } from "react";
import { del, set } from "object-path-immutable";
import { Text, View, Image, FlatList } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import {
  Surface,
  RadioButton,
  Button,
  Switch,
  // ActivityIndicator,
  HelperText,
  IconButton,
} from "react-native-paper";
import { _filterDuplicatePrinter, _filterDuplicateIP } from "./HelperFunctions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Sentry from "@sentry/react-native";

//context
import { MerchantInterfaceConsumer, withContext } from "context";

//lib
import { Services, Functions } from "lib";

//field
import { SideModal, Input } from "fields";
const { TextInput } = Input;

//style
import Style from "./style";
import colors from "styles/_variables";

//icons
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";

//Image
import StarPrinterLogo from "assets/Images/star-micronics-logo.png";
import EpsonPrinterLogo from "assets/Images/epson-logo.png";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { TouchableOpacity } from "react-native";

const PRINTER_BRANDS = {
  epson: { value: "epson", label: "EPSON" },
  star: { value: "star", label: "STAR" },
  others: { value: "other", label: "Other" },
};
const STAR_MODELS = [
  { value: "sp700", label: "SP-700" },
  { value: "tsp143/100", label: "TSP143/100" },
  { value: "other", label: "Other" },
];
export class EditPrinterModal extends Component {
  state = {
    newBrand: "",
    printerNewName: "",
    newIpAddress: this.props.printerInfo.ipAddress,
    macAddress: this.props.printerInfo.macAddress,
    isLoading: false,
    registeredPrinter: this.props.printerInfo,
    printerModel: this.props.printerInfo.printerModel || "",
    newPortNumber: "9100",
    isFocus: false,
  };
  componentDidMount() {
    this.props.onRef(this);
    const { printerBrand = "", printerInfo = {} } = this.props;
    const { printerName = "", ipAddress } = printerInfo;
    this.setState({
      newBrand: printerBrand,
      printerNewName: printerName,
      newIpAddress: ipAddress,
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
    this.setState = () => {
      return;
    };
  }
  // onHandleChangePrinterBrandFail = printerName => {
  //   this.confirmNotif = Functions.ShowConfirmNotif({
  //     title: "Error",
  //     message: `Failed to change ${printerName}'s details. Please try again.`,
  //     type: "error",
  //     props: { displayType: "warning" },
  //   });
  // };
  onHandleSuccess = ({
    addedPrinters,
    printerID,
    newPrinterInfo = {},
    // actionType = "remove",
  }) => {
    const { ShowConfirmNotif } = Functions;
    const { onUpdateAddedPrinters } = this.props;
    const { printerName = "" } = newPrinterInfo;
    const payload = set(addedPrinters, printerID, newPrinterInfo);
    onUpdateAddedPrinters(payload);
    ShowConfirmNotif({
      title: "Success",
      message: `Successfully Updated ${printerName}'s Details.`,
      type: "success",
    });
  };
  onChangeModel = ({ value }) => this.setState({ printerModel: value });
  onChangePrinterInfo = async () => {
    const { onCloseConfirmOwnerPinModal } = this.props;
    onCloseConfirmOwnerPinModal();
    this.setState({ isLoading: true, errorMsg: null });
    const {
      printerID,
      addedPrinters,
      shopID,
      onCloseModal,
      printTest = () => {},
    } = this.props;

    let printerInfo = this.props.printerInfo || {};
    let newPrinterInfo = { ...printerInfo };
    const { newIpAddress, newBrand, printerModel, printerNewName, macAddress } =
      this.state;
    const {
      ipAddress,
      connectType,
      printerBrand,
      printerName: currentPrinterName,
      printerModel: currentPrinterModel,
    } = printerInfo;
    const { Merchants } = Services;
    const { ChangePrinterInfoMobile } = Merchants.PostRequests;
    let printerName = printerNewName;
    let { success } = {};
    let connected = false;
    const msg = this.onValidate();
    if (msg) {
      this.setState({
        isLoading: false,
        errorMsg: msg,
        newIpAddress: this.state.registeredPrinter.ipAddress,
        newBrand: this.state.registeredPrinter.printerBrand,
        printerNewName: this.state.registeredPrinter.printerName,
        printerModel: this.state.registeredPrinter.printerModel,
      });
      return;
    }
    try {
      newPrinterInfo.printerBrand = newBrand;
      newPrinterInfo.printerName = printerNewName;
      newPrinterInfo.ipAddress = newIpAddress;
      newPrinterInfo.printerModel = printerModel;
      if (connectType === "ble") {
        success = await ChangePrinterInfoMobile({
          printerID,
          printerInfo: newPrinterInfo,
          shopID,
        });
        success
          ? this.onHandleSuccess({
              addedPrinters,
              printerID,
              newPrinterInfo,
            })
          : this.onHandleChangePrinterBrandFail(printerName);
        onCloseModal();
      } else {
        //if new ip address is entered or new brand or new model is selected
        if (
          newIpAddress !== ipAddress ||
          newBrand !== printerBrand ||
          printerModel !== currentPrinterModel
        ) {
          connected = await printTest({
            connectType,
            ipAddress: newIpAddress,
            macAddress: macAddress,
            printerBrand: newBrand,
            printerName,
            printerModel,
            updatePrinterInfo: true,
          });

          if (connected) {
            success = await ChangePrinterInfoMobile({
              printerID,
              printerInfo: newPrinterInfo,
              shopID,
            });
            if (success) {
              this.onHandleSuccess({
                addedPrinters,
                printerID,
                newPrinterInfo,
              });
              onCloseModal();
            }
          } else {
            this.setState({
              errorMsg: "Invalid IP Address",
              isLoading: false,
              newIpAddress: this.state.registeredPrinter.ipAddress,
              newBrand: this.state.registeredPrinter.printerBrand,
              printerModel: this.state.registeredPrinter.printerModel,
            });
            return;
          }
        } else if (printerName !== currentPrinterName) {
          success = await ChangePrinterInfoMobile({
            printerID,
            printerInfo: newPrinterInfo,
            shopID,
          });
          if (success) {
            this.onHandleSuccess({
              addedPrinters,
              printerID,
              newPrinterInfo,
            });
            onCloseModal();
          }
        }
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: { message: "Error in onChangePrinterInfo" },
      });
      // this.onHandleChangePrinterBrandFail(printerName);
      this.setState({ errorMsg: "Invalid IP Address" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onPrintTest = async () => {
    const { printerInfo = {}, context = {}, printTest = () => {} } = this.props;
    const {
      connectType = "",
      ipAddress = "",
      macAddress = "",
      printerName = "",
    } = printerInfo;
    const { newBrand } = this.state;
    let success = true;
    this.setState({ isPrinting: true, errorMsg: null });
    try {
      success = await printTest({
        connectType,
        ipAddress,
        macAddress,
        printerBrand: newBrand,
        printerName,
      });
      if (!success) this.setState({ errorMsg: "Unable to print test order" });
    } catch (err) {
      this.setState({ errorMsg: "Unable to print test order" });
    } finally {
      this.setState({ isPrinting: false });
    }
  };
  onCheckPrinterName = () => {
    const { addedPrinters, printerInfo } = this.props;
    const { printerName, ipAddress, macAddress } = printerInfo;
    const isDuplicate = _filterDuplicatePrinter({
      addedPrinters,
      printerName,
      address: ipAddress || macAddress,
    });
    if (isDuplicate)
      this.setState({ errorMsg: "This name has been registered" });
  };
  renderError = () =>
    !!this.state.errorMsg && (
      <HelperText
        type="error"
        style={{
          marginVertical: responsiveHeight(0.6),
          fontSize: responsiveFontSize(0.8),
        }}>
        {this.state.errorMsg}
      </HelperText>
    );
  onChangeBrand = newBrand => {
    const { printerInfo } = this.props;
    const { printerModel = "" } = printerInfo;
    if (newBrand !== "star") {
      this.setState({ printerModel: "" });
    } else {
      this.setState({ printerModel });
    }
    this.setState({ newBrand: newBrand });
  };
  renderPrinterBrand = () => {
    return (
      <RadioButton.Group
        value={this.state.newBrand}
        onValueChange={this.onChangeBrand}>
        {Object.keys(PRINTER_BRANDS).map(brand => {
          return (
            <View style={Style.option} key={brand}>
              <RadioButton value={brand} color={colors.primary} />
              {brand === "others" ? (
                <Text style={Style.brandText}>Others</Text>
              ) : (
                <Image
                  style={Style.brandImage}
                  source={
                    brand === "epson" ? EpsonPrinterLogo : StarPrinterLogo
                  }
                />
              )}
            </View>
          );
        })}
      </RadioButton.Group>
    );
  };
  renderLabel = () => {
    const { printerModel, isFocus } = this.state;
    if (printerModel || isFocus) {
      return <Text style={Style.label}>Star Model</Text>;
    }
    return null;
  };
  renderPrinterModel = () => {
    const { printerModel, isOpen } = this.state;
    const selectedLabel =
      STAR_MODELS.find(opt => opt.value === printerModel)?.label ||
      "Select Star Model";

    return (
      <View style={Style.wrapper}>
        <TouchableOpacity
          style={[Style.dropdown, isOpen && Style.dropdownOpen]}
          onPress={() => this.setState({ isOpen: !isOpen })}>
          <Text
            style={printerModel ? Style.selectedText : Style.placeholderText}>
            {selectedLabel}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={Style.optionContainer}>
            {STAR_MODELS.map(item => {
              const isSelected = item.value === printerModel;
              return (
                <TouchableOpacity
                  key={item.value}
                  style={[Style.optionItem, isSelected && Style.selectedItem]}
                  onPress={() => {
                    this.setState({
                      printerModel: item.value,
                      isOpen: false,
                    });
                  }}>
                  <Text
                    style={[
                      Style.optionText,
                      isSelected && Style.selectedTextColor,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  renderButtons = () => {
    const { onOpenConfirmOwnerPinModal, printerInfo, printerID } = this.props;
    const { macAddress } = this.state;
    return (
      <View style={Style.buttonContainer}>
        <Button
          mode={this.state.isLoading ? "outlined" : "contained"}
          color={colors.primary}
          style={Style.button}
          disabled={macAddress ? true : this.state.isLoading}
          labelStyle={Style.updateLabel}
          loading={this.state.isLoading}
          onPress={() =>
            onOpenConfirmOwnerPinModal({ printerInfo, printerID })
          }>
          {this.state.isLoading ? "Updating" : "Update"}
        </Button>
      </View>
    );
  };
  onValidate = () => {
    const { addedPrinters = {} } = this.props;
    const { newIpAddress, macAddress, newBrand, printerNewName, printerModel } =
      this.state;
    const { printerInfo } = this.props;
    const {
      connectType,
      printerBrand,
      ipAddress,
      printerName,
      printerModel: currentPrinterModel,
    } = printerInfo;
    let msg;
    if (
      (newIpAddress === ipAddress &&
        newBrand === printerBrand &&
        printerNewName !== printerName) ||
      (newBrand !== printerBrand &&
        newIpAddress === ipAddress &&
        newBrand !== "star") ||
      (newBrand === "star" && printerModel !== currentPrinterModel)
    )
      return;
    else if (!printerName && !newIpAddress) {
      msg = "IP Address and Printer name are required";
      this.setState({
        newIpAddress: this.state.registeredPrinter.ipAddress,
        printerNewName: this.state.registeredPrinter.printerName,
      });
    } else if (!printerName) {
      msg = "Printer name is required";
      this.setState({
        printerNewName: this.state.registeredPrinter.printerName,
      });
    } else if (!newIpAddress && !macAddress) {
      msg =
        connectType === "ble"
          ? "A printer must be selected"
          : "IP Address is required";
      this.setState({ newIpAddress: this.state.registeredPrinter.ipAddress });
    } else if (!printerModel && newBrand === "star") {
      msg = "A model must be selected for Star printer";
    } else if (
      _filterDuplicatePrinter({
        addedPrinters,
        connectType,
        printerName,
        printerModel,
        address: connectType === "lan" ? newIpAddress : macAddress,
      }) &&
      newBrand === printerBrand &&
      connectType === "lan"
    )
      msg =
        "This printer has already been registered.\nPlease enter a different IP address or Printer name";
    else if (
      _filterDuplicatePrinter({
        addedPrinters,
        connectType,
        printerName,
        address: connectType === "lan" ? newIpAddress : macAddress,
      }) &&
      newBrand === printerBrand &&
      connectType === "ble"
    )
      msg =
        "This printer has already been registered.\nPlease enter a different Printer name";
    else if (
      _filterDuplicateIP({
        addedPrinters,
        connectType,
        printerName,
        address: newIpAddress,
      })
    )
      msg =
        "This IP Address has already been registerd.\nPlease enter a different IP Address";
    return msg;
  };

  render() {
    const { printerInfo, onOpenConfirmOwnerPinModal, onOpenSelectPortModal } =
      this.props;
    const { ipAddress, macAddress, printerBrand, printerID } = printerInfo;
    const { printerNewName = "", newBrand = "" } = this.state;
    return (
      <SideModal
        onCloseModal={this.props.onCloseModal}
        side="left"
        header_title="Edit Printer"
        containerStyle={{ width: responsiveWidth(40) }}>
        <Surface style={Style.printer}>
          {this.renderError()}
          {ipAddress ? (
            <React.Fragment>
              <View style={Style.description}>
                <Text style={Style.title}>Edit IP Address</Text>
                <Text style={Style.requireLabel}>required</Text>
              </View>
              <View style={Style.editIpAndPort}>
                <TextInput
                  mode="outlined"
                  label="IP Address"
                  placeholder={this.state.registeredPrinter.ipAddress}
                  value={this.state.newIpAddress}
                  keyboardType="phone-pad"
                  onChangeText={newIpAddress => this.setState({ newIpAddress })}
                  containerStyle={Style.inputField}
                />
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={Style.description}>
                <Text style={Style.title}>Printer Brand</Text>
              </View>
              {printerBrand === "others" ? (
                <Text style={Style.bleBrandText}>Others</Text>
              ) : (
                <Image
                  style={Style.bleBrandImage}
                  source={
                    this.props.printerInfo.printerBrand === "epson"
                      ? EpsonPrinterLogo
                      : StarPrinterLogo
                  }
                />
              )}
              <TextInput
                mode="outlined"
                label="MAC Address"
                value={`${macAddress} (Do Not Change)`}
                containerStyle={Style.inputField}
              />
              <View style={Style.brands}>{this.renderPrinterModel()}</View>
            </React.Fragment>
          )}
          <TextInput
            style={Style.printerName}
            mode="outlined"
            label="Printer Name"
            value={printerNewName}
            onChangeText={printerNewName => this.setState({ printerNewName })}
            onEndEditing={this.onCheckPrinterName}
          />

          {ipAddress ? (
            <React.Fragment>
              {newBrand === "star" && (
                <View style={Style.brands}>{this.renderPrinterModel()}</View>
              )}
              <View style={Style.description}>
                <Text style={Style.title}>Select Printer Brand</Text>
                <Text style={Style.requireLabel}>required</Text>
              </View>
              <View style={Style.brands}>{this.renderPrinterBrand()}</View>
            </React.Fragment>
          ) : null}
          {/* <Button
            mode={this.state.isPrinting ? "outlined" : "contained"}
            color={colors.primary}
            style={Style.testButton}
            labelStyle={Style.btnLabel}
            disabled={this.state.isPrinting}
            loading={this.state.isPrinting}
            onPress={this.onPrintTest}>
            {this.state.isPrinting ? "Printing" : "Print Test Order"}
          </Button> */}
        </Surface>
        {/* {this.state.isLoading && (
          <ActivityIndicator
            size={colors.isSmallScreen ? "small" : "large"}
            color={colors.skipli_red_color}
            style={Style.indicator}
          />
        )} */}
        {this.renderButtons()}
      </SideModal>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(EditPrinterModal);
