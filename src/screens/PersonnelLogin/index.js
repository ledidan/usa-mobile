import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Linking,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button, Text } from "react-native-paper";
//context
import { AuthInterfaceConsumer, withContext } from "context";
//Style
import Style from "./style";

//Icons
import { SkipliLogoWithTextIcon } from "assets/Icons";
import Icon from "react-native-vector-icons/MaterialIcons";

//Lib
import { Functions, Services, Constants } from "lib";
import DeviceInfo from "react-native-device-info";
// Components
import { Modals, StoreID } from "components";
//Field
import { DismissKeyBoard, Input } from "fields";
const { TextInput } = Input;
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const { LocalStorage } = Functions;
const { Merchants } = Services;
const { VerifyPersonnelPin, GetShopPersonnelInfo } = Merchants.GetRequests;

class PersonnelLogin extends Component {
  state = { inputErrorText: "", pin: "", showAppDetailsModal: false };
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  onInputChange = pin => {
    this.setState({ pin });
  };
  onShowError = errMsg => this.setState({ inputErrorText: errMsg });

  onValidate = async (shopID, personnelID) => {
    const { onLoadPersonnelInfo } = this.props.context;
    const { personnel = {}, success } = await GetShopPersonnelInfo({
      personnelID,
      shopID,
    });
    if (Object.keys(personnel).length === 0 || !success) {
      this.onShowError("Could not find your personnel PIN");
    } else {
      const { role = "" } = personnel;
      if (role === "staff") {
        LocalStorage.saveItemIntoStorage("personnelID", personnelID).then(
          () => {
            onLoadPersonnelInfo(shopID);
          },
        );
      } else {
        this.onShowError(
          "If you are the owner, please use the website version",
        );
      }
    }
  };
  onSubmitPin = async () => {
    const { route } = this.props;
    const { shopID } = route.params;
    const params = { personnelPin: this.state.pin, shopID };
    const { personnelID = "", success } = await VerifyPersonnelPin(params);
    if (!personnelID || !success)
      this.onShowError("Could not find your personnel PIN");
    else {
      this.setState({ inputErrorText: "" }, () => {
        this.onValidate(shopID, personnelID);
      });
    }
  };
  onHelpButtonPress = (contactType = "") => {
    const { REGEX } = Constants;
    if (contactType.match(REGEX.US_PHONE_NUMBER)) {
      Linking.openURL("tel:+17145985560");
    } else if (contactType.match(REGEX.EMAIL)) {
      Linking.openURL("mailto:accounts@skiplinow.com");
    }
  };
  renderContent = () => {
    const { route } = this.props;
    const { address = "", name = "", shopID = "" } = route.params;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Style.contentContainer}>
        <View style={Style.content}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={Style.backBtn}>
            <Icon size={responsiveWidth(2)} name="arrow-back" />
            <Text style={Style.backBtnLabel}>Back</Text>
          </TouchableOpacity>
          <SkipliLogoWithTextIcon
            width={responsiveWidth(12)}
            height={responsiveHeight(6)}
            style={Style.skipliLogo}
          />
          <View style={Style.shopContent}>
            <StoreID shopId={shopID} />
            <Text style={Style.name}>{name}</Text>
            <Text style={Style.address}>{address}</Text>
          </View>
          <Text style={Style.message}>Enter your pin to continue</Text>
          {this.renderForm()}
        </View>
      </ScrollView>
    );
  };
  renderForm = () => {
    const { pin, inputErrorText } = this.state;
    return (
      <View>
        <TextInput
          mode="outlined"
          onChangeText={this.onInputChange}
          label="Pin Number"
          error={inputErrorText !== ""}
          errMsg={inputErrorText}
          value={pin}
          keyboardType="number-pad"
          containerStyle={[Style.pinInput]}
          theme={{ colors: { accent: "#ffa055" } }}
          onSubmitEditing={this.onSubmitPin}
        />
        <Button
          mode="contained"
          onPress={this.onSubmitPin}
          disabled={!pin}
          labelStyle={Style.btnLabel}
          style={[Style.submitBtn, !pin && { opacity: 0.8 }]}>
          Log In
        </Button>
        {this.renderSupport()}
      </View>
    );
  };
  renderSupport = () => {
    const { HelpActions } = Functions;
    return (
      <View style={Style.support}>
        <View>
          <Text style={Style.needHelp}>Need Help? Contact us</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => HelpActions("6789996082")}>
            <Text style={[Style.needHelp, Style.info]}>(678) 999-6082</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HelpActions("accounts@skiplinow.com")}>
            <Text style={[Style.needHelp, Style.info]}>
              accounts@skiplinow.com
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderAppVersion()}
      </View>
    );
  };

  renderAppVersion = () => {
    return (
      <React.Fragment>
        <TouchableOpacity
          style={Style.appVersion}
          onPress={() => this.setState({ showAppDetailsModal: true })}>
          <Text style={{ fontSize: responsiveFontSize(1), color: "#fff" }}>
            v {`${DeviceInfo.getVersion()}`}
          </Text>
        </TouchableOpacity>
        <Modals.AppInfoModal
          isVisible={this.state.showAppDetailsModal}
          onClose={() => this.setState({ showAppDetailsModal: false })}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <DismissKeyBoard>
        <ImageBackground
          source={require("assets/Images/landingPageImage.jpg")}
          style={Style.background}>
          <DismissKeyBoard>{this.renderContent()}</DismissKeyBoard>
        </ImageBackground>
      </DismissKeyBoard>
    );
  }
}

export default withContext(AuthInterfaceConsumer)(PersonnelLogin);
