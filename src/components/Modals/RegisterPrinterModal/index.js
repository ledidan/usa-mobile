import React, { Component } from "react";
import PropTypes from "prop-types";
import AndroidSettings from "react-native-android-open-settings";
import { set } from "object-path-immutable";
import { Text, View, FlatList, Alert } from "react-native";
import {
  Button,
  Title,
  Headline,
  RadioButton,
  HelperText,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { _filterDuplicatePrinter } from "./HelperFunctions";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-element-dropdown";
//context
import { MerchantInterfaceConsumer, withContext } from "context";

//lib
import { Functions } from "lib";

//Styles
import Style from "./style";
import colors from "styles/_variables";

//Fields
import { Modal, Strong, Input } from "fields";
const { TextInput } = Input;

//Icons
import { PrinterIcon } from "assets/Icons";
//Components
import { VideoTutorials } from "components";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { TouchableOpacity } from "react-native";
import * as Sentry from "@sentry/react-native";

const PRINTER_BRANDS = {
  epson: { value: "epson", label: "EPSON" },
  star: { value: "star", label: "STAR" },
  others: { value: "others", label: "Other" },
};
const STAR_MODELS = [
  { value: "sp700", label: "SP-700" },
  { value: "tsp143/100", label: "TSP143/100" },
  { value: "other", label: "Other" },
];
const CONNECTION_TYPES = {
  lan: { value: "lan", label: "LAN", icon: "transit-connection-variant" },
  ble: { value: "ble", label: "Bluetooth", icon: "bluetooth" },
};

export class RegisterPrinterModal extends Component {
  state = {
    connectType: "lan",
    isRegistering: false,
    ipAddress: "",
    macAddress: "",
    printerName: "",
    starPrinterModel: "", 
    printerBrand: "",
    isFocus: false,
  };
  listRef = React.createRef(null);
  pages = [
    { page: () => this.renderInstructions() },
    { page: () => this.renderRegisterContent() },
  ];
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  safeSetState = data => {
    if (this._isMounted) this.setState(data);
  };
  onCancel = () => {
    Alert.alert(
      "Important",
      "Your change will not be saved. Do you want to continue?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => this.props.onCloseModal() },
      ],
    );
  };
  setDropDownOpen = open => this.setState({ open });
  onChangePrinter = (printerInfo = "") => {
    const printer = printerInfo.split("/");
    this.setState({ macAddress: printer[0], printerName: printer[1] });
  };
  onValidate = printerName => {
    const { addedPrinters = {} } = this.props;
    const {
      ipAddress,
      macAddress,
      printerBrand,
      connectType,
      starPrinterModel,
    } = this.state;
    let msg;
    if (!printerBrand) msg = "A printer brand must be selected";
    else if (!ipAddress && !macAddress)
      msg =
        connectType === "ble"
          ? "A printer must be selected"
          : "IP Address is required";
    else if (!starPrinterModel && printerBrand === "star")
      msg = "A printer model must be selected";
    else if (
      _filterDuplicatePrinter({
        addedPrinters,
        connectType,
        printerName,
        address:
          connectType === "lan" ? this.state.ipAddress : this.state.macAddress,
      })
    )
      msg =
        "Sorry, this printer was registered. Please use different address or name for this printer";
    return msg;
  };
  onRegisterPrinter = async () => {
    const {
      onAddMobileAppPrinter,
      onUpdateAddedPrinters,
      addedPrinters = {},
      context,
      printTest = () => {},
    } = this.props;
    const { ShowConfirmNotif } = Functions;
    const connectType = this.state.connectType;
    let printerName = this.state.printerName;
    this.setState({ isRegistering: true, errMsg: "" });
    const msg = this.onValidate(printerName);
    if (msg) {
      this.setState({ isRegistering: false, errMsg: msg });
      return;
    }
    let connected = false;
    try {
      connected = await printTest({
        connectType,
        ipAddress: this.state.ipAddress,
        macAddress: this.state.macAddress,
        printerBrand: this.state.printerBrand,
        printerName,
        printerModel: this.state.starPrinterModel,
        updatePrinterInfo: false,
      });
      if (!connected) {
        this.setState({
          isRegistering: false,
          errMsg:
            "Unable to register printer. Please follow the instructions carefully and try again!",
        });
        return;
      }

      if (connectType === "lan") {
        printerName = printerName
          ? printerName
          : `${this.state.ipAddress}:9100`;
      }
      const printerInfo = {
        connectType,
        printerName,
        ipAddress: this.state.ipAddress,
        macAddress: this.state.macAddress,
        printerBrand: this.state.printerBrand,
        printerModel: this.state.starPrinterModel, // Not using starPrinterModel as the key value, because we might also records epson model in the future.
      };
      const printerID = nanoid(12);
      const success = await onAddMobileAppPrinter({ printerInfo, printerID });
      console.log("success :", success);
      this.setState({ isRegistering: false, errMsg: "" }, () => {
        if (success) {
          onUpdateAddedPrinters(set(addedPrinters, printerID, printerInfo));
          ShowConfirmNotif({
            title: "Success",
            message: "Your printer was successfully registered",
            type: "success",
          });
          this.props.onCloseModal();
        } else
          this.setState({
            isRegistering: false,
            errMsg: "Unable to register printer. Let try again!",
          });
      });
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          message: "Error in RegisterPrinterModal.onRegisterPrinter",
          currentState: this.state
        },
      });
      this.setState({
        isRegistering: false,
        errMsg: "Our system was not able to save your data. Please try again",
      });
    }
  };
  onChangeBrand = printerBrand => this.setState({ printerBrand });
  onChangeModel = value => this.setState({ starPrinterModel: value });
  onChangeConnectType = connectType => this.setState({ connectType });
  renderOptions = ({
    selectedValue,
    onValueChange,
    options = {},
    title = "",
  }) => {
    return (
      <RadioButton.Group value={selectedValue} onValueChange={onValueChange}>
        <View style={Style.options}>
          <Text style={Style.title}>{title}: </Text>
          {Object.keys(options).map(key => {
            const { value = "", label = "", icon } = options[key];
            return (
              <View style={Style.optionContent} key={key}>
                <RadioButton value={value} color={colors.primary} />
                {!!icon && (
                  <MaterialComIcon
                    name={icon}
                    size={responsiveWidth(1.8)}
                    style={{ marginLeft: responsiveWidth(0.5) }}
                  />
                )}
                <Text style={Style.optionLabel}>{label}</Text>
              </View>
            );
          })}
        </View>
      </RadioButton.Group>
    );
  };
  renderCancelBtn = () => (
    <Button
      mode="contained"
      style={[Style.button, Style.cancelBtn]}
      color="white"
      labelStyle={[Style.btnLabel, Style.cancelLabel]}
      onPress={this.props.onCloseModal}>
      Cancel
    </Button>
  );
  renderButtons = (type = "register", index = 0) => {
    switch (type) {
      case "register":
        return (
          <View style={Style.btnContainer}>
            {this.renderCancelBtn()}
            <Button
              mode="contained"
              style={Style.button}
              labelStyle={Style.btnLabel}
              loading={this.state.isRegistering}
              color={this.state.isRegistering ? "#fff" : colors.primary}
              onPress={() =>
                !this.state.isRegistering && this.onRegisterPrinter()
              }>
              {this.state.isRegistering
                ? "Processing"
                : "Register "}
            </Button>
          </View>
        );
      case "settings":
        return (
          <View style={[Style.btnContainer, { alignSelf: "flex-start" }]}>
            {this.renderCancelBtn()}
            <Button
              mode="contained"
              style={[Style.button]}
              labelStyle={[Style.btnLabel]}
              onPress={this.onOpenBleSettings}>
              Open Settings
            </Button>
          </View>
        );
      case "pairNewDevice":
        return (
          <View style={Style.btnContainer}>
            <Button
              mode="contained"
              style={[Style.button, Style.cancelBtn]}
              color="white"
              labelStyle={[Style.btnLabel, Style.cancelLabel]}
              onPress={this.onOpenBleSettings}>
              Pair New Device
            </Button>
          </View>
        );
      case "back":
        return (
          <Button
            icon="arrow-left"
            color="black"
            onPress={() => this.listRef.current.scrollToIndex({ index })}
            labelStyle={Style.btnLabel}
            style={Style.backBtn}>
            Back
          </Button>
        );
      case "firstPage":
        return (
          <View
            style={[
              Style.btnContainer,
              {
                alignSelf: "flex-end",
                position: "absolute",
                bottom: responsiveHeight(2),
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: responsiveWidth(4),
              },
            ]}>
            {this.renderCancelBtn()}
            <Button
              mode="contained"
              style={Style.button}
              labelStyle={Style.btnLabel}
              onPress={() => this.listRef.current.scrollToIndex({ index })}>
              Continue
            </Button>
          </View>
        );
      default:
        return null;
    }
  };
  onOpenBleSettings = () => {
    this.props.onCloseModal();
    AndroidSettings.bluetoothSettings();
  };
  renderError = () => {
    return (
      !!this.state.errMsg && (
        <HelperText
          type="error"
          visible={!!this.state.errMsg}
          style={Style.helperText}>
          {this.state.errMsg}
        </HelperText>
      )
    );
  };
  renderVideoInstructions = videoId => (
    <VideoTutorials
      videoId={videoId}
      style={{ width: "60%", height: responsiveHeight(50) }}
    />
  );
  renderNotice = () => (
    <HelperText type="error" style={Style.notice}>
      * Star printer model TSP 100III is not supported
    </HelperText>
  );
  // renderStarModelOptions = ({
  //   onValueChange,
  //   title = "",
  //   selectedValue,
  //   options = {},
  // }) => {
  //   return (
  //     <RadioButton.Group value={selectedValue} onValueChange={onValueChange}>
  //       <View style={Style.options}>
  //         <Text style={Style.title}>{title}: </Text>
  //         {Object.keys(options).map(key => {
  //           const { value = "", label = "", icon } = options[key];
  //           return (
  //             <View style={Style.optionContent} key={key}>
  //               <RadioButton value={value} color={colors.primary} />
  //               {!!icon && (
  //                 <MaterialComIcon
  //                   name={icon}
  //                   size={responsiveWidth(1.8)}
  //                   style={{ marginLeft: responsiveWidth(0.5) }}
  //                 />
  //               )}
  //               <Text style={Style.optionLabel}>{label}</Text>
  //             </View>
  //           );
  //         })}
  //       </View>
  //     </RadioButton.Group>
  //   );
  // };
  // renderStarModelOptions = ({
  //   onValueChange,
  //   title = "",
  //   selectedValue,
  //   options = [],
  // }) => {
  //   return (
  //     <Dropdown
  //       style={Style.dropdown}
  //       placeholderStyle={Style.placeholderStyle}
  //       selectedTextStyle={Style.selectedTextStyle}
  //       itemTextStyle={Style.itemStyle}
  //       containerStyle={Style.containerStyle}
  //       data={options}
  //       maxHeight={300}
  //       labelField="label"
  //       valueField="value"
  //       placeholder="Select Star Model"
  //       value={selectedValue}
  //       onChange={onValueChange}
  //     />
  //   );
  // };
  renderLabel = () => {
    const { starPrinterModel, isFocus } = this.state;
    if (starPrinterModel || isFocus) {
      return <Text style={Style.label}>Star Model</Text>;
    }
    return null;
  };
  renderStarModelOptions = ({ onValueChange, selectedValue, options = [] }) => {
    const { isOpen } = this.state;
    const selectedLabel =
      options.find(opt => opt.value === selectedValue)?.label ||
      "Select Star Model";

    return (
      <View style={Style.wrapper}>
        <TouchableOpacity
          style={[Style.dropdown, isOpen && Style.dropdownOpen]}
          onPress={() => this.setState({ isOpen: !isOpen })}>
          <Text
            style={selectedValue ? Style.selectedText : Style.placeholderText}>
            {selectedLabel}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View style={Style.optionContainer}>
            <FlatList
              data={options}
              keyExtractor={item => item.value.toString()}
              renderItem={({ item }) => {
                const isSelected = item.value === selectedValue;
                return (
                  <TouchableOpacity
                    style={[Style.optionItem, isSelected && Style.selectedItem]}
                    onPress={() => {
                      onValueChange(item.value);
                      this.setState({ isOpen: false });
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
              }}
            />
          </View>
        )}
      </View>
    );
  };
  renderPrinters = () => {
    const { blePrinterList = [] } = this.props;
    const { connectType } = this.state;
    if (connectType === "ble")
      return blePrinterList.length > 0 ? (
        <React.Fragment>
          {this.renderButtons("pairNewDevice")}
          <RadioButton.Group
            value={`${this.state.macAddress}/${this.state.printerName}`}
            onValueChange={this.onChangePrinter}>
            <View style={Style.blePrinterOptions}>
              {blePrinterList.map(printer => (
                <View
                  style={Style.printerOptions}
                  key={printer.inner_mac_address}>
                  <RadioButton
                    color={colors.primary}
                    value={`${printer.inner_mac_address}/${printer.device_name}`}
                  />
                  <View style={Style.printerContent}>
                    <PrinterIcon
                      width={responsiveWidth(3)}
                      height={responsiveHeight(3)}
                      fill="black"
                    />
                    <View style={Style.blePrinter}>
                      <Text style={Style.printerName}>
                        {printer.device_name}
                      </Text>
                      <Text style={Style.printerMacAddr}>
                        {printer.inner_mac_address}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </RadioButton.Group>
          {this.renderError()}
          {this.renderButtons("register")}
        </React.Fragment>
      ) : (
        <View style={Style.msgContainer}>
          <Headline style={Style.msgHeadline}>No Printers Found</Headline>
          <Title style={Style.msgTitle}>
            You have not paired your tablet with any bluetooth printers. {`\n`}
            Please connect your device with a printer.
          </Title>
          {this.renderError()}
          {this.renderButtons("settings")}
        </View>
      );

    return (
      <React.Fragment>
        <TextInput
          mode="outlined"
          label="IP Address *Required"
          placeholder="192.168.0.12 (Example)"
          keyboardType="phone-pad"
          onChangeText={ipAddress => this.setState({ ipAddress })}
          containerStyle={Style.inputField}
        />
        <TextInput
          mode="outlined"
          label="Printer Name"
          placeholder="My Epson Printer"
          onChangeText={printerName => this.setState({ printerName })}
          containerStyle={Style.inputField}
        />
        {this.renderError()}
        {this.renderButtons("register")}
      </React.Fragment>
    );
  };
  renderRegisterContent = () => {
    const {
      connectType,
      blePrinterList = [],
      printerBrand,
      starPrinterModel,
    } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={Style.viewContainer}>
        {this.renderButtons("back", 0)}
        <View style={Style.printerContainer}>
          <View style={Style.printerContentContainer}>
            {/* {this.renderNotice()} */}
            {this.renderOptions({
              onValueChange: this.onChangeBrand,
              title: "Printer Brand",
              options: PRINTER_BRANDS,
              selectedValue: this.state.printerBrand,
            })}
            {this.state.printerBrand === "star" &&
              this.renderStarModelOptions({
                onValueChange: this.onChangeModel,
                options: STAR_MODELS,
                selectedValue: this.state.starPrinterModel,
              })}
            {this.renderPrinters()}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };
  renderInstructions = () => {
    const { connectType } = this.state;
    return (
      <View style={[Style.viewContainer, { alignItems: "center" }]}>
        <View style={Style.connectTypeOptions}>
          {this.renderOptions({
            onValueChange: this.onChangeConnectType,
            options: CONNECTION_TYPES,
            title: "Connection type",
            selectedValue: this.state.connectType,
          })}
        </View>
        {/* {this.renderVideoInstructions(
          connectType === "lan" ? "Iuk8s3UBGbw" : "YYQxwAZ9ZeI",
        )} */}
        {this.renderVideoInstructions("MQdp_8yttWM")}
        {this.renderButtons("firstPage", 1)}
      </View>
    );
  };
  renderItems = ({ item }) => item.page();
  render() {
    const { onCloseModal } = this.props;
    return (
      <Modal
        avoidKeyboard={true}
        contentLabel="Register Printer"
        headerProps={{
          customHeader: (
            <Strong style={{ fontSize: responsiveFontSize(2) }}>
              Register a Printer
            </Strong>
          ),
        }}
        contentDescriptionProps={{
          showContentDescription: false,
        }}
        onCloseModal={onCloseModal}
        shouldCloseOnOverlayClick={false}
        modalStyle={{
          contentContainer: Style.modalContentContainer,
        }}
        isFullScreen>
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            data={this.pages}
            ref={this.listRef}
            keyExtractor={item => item.page}
            renderItem={this.renderItems}
          />
        </View>
      </Modal>
    );
  }
}

RegisterPrinterModal.propTypes = {
  addedPrinters: PropTypes.shape().isRequired,
  onAddMobileAppPrinter: PropTypes.func.isRequired,
  onUpdateAddedPrinters: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  blePrinterList: PropTypes.array,
};

export default withContext(MerchantInterfaceConsumer)(RegisterPrinterModal);
