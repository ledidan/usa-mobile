import React, { Component } from "react";
import { View, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { Button, RadioButton, Subheading, Title } from "react-native-paper";
const { width: deviceWidth } = Dimensions.get("window");
// Sentry
import * as Sentry from "@sentry/react-native";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const { LocalStorage } = Functions;
import { Services, Functions } from "lib";

import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from "react-native-android-open-settings";

//Icons
import { SkipliLogoWithTextIcon } from "assets/Icons";

//Styles
import colors from "styles/_variables";
import Styles from "./styles";
//Fields
import { DismissKeyBoard, Input, PageMsg } from "fields";
const { TextInput } = Input;
//Components
import { HomeScreenModules, Modals } from "components";
import { Linking, Alert } from "react-native";
const BKG_IMG_URL = "https://i.imgur.com/RotYBiS.png";
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthInterfaceConsumer, withContext } from "context";
import deviceInfoModule from "react-native-device-info";
const { Merchants } = Services;
const { GetShopPersonnelInfo } = Merchants.GetRequests;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: "",
      shopID: "",
      showSearchResult: false,
      searchBy: "id",
      show_modal: false,
      show_app_info_modal: false,
      isConnected: true,
      _isMounted: false,
    };
    this.requestAllPermissions = this.requestAllPermissions.bind(this);
  }
  inputRef = React.createRef();

  onChangeSearchQuery = searchQuery => {
    this.state.searchBy === "name"
      ? this.setState({ shopName: searchQuery })
      : this.setState({ shopID: searchQuery });
  };

  openSettings = async () => {
    await Linking.openSettings();
    this.setState({ show_modal: false });
  };
  onShowError = errMsg => this.setState({ inputErrorText: errMsg });

  requestAllPermissions = async () => {
    try {
      const permissions_to_request = [
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_ADMIN,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH,
      ];

      const results = await requestMultiple(permissions_to_request);

      const first_permission = results[permissions_to_request[0]];

      if (first_permission === RESULTS.BLOCKED) {
        this.setState({ show_modal: true });
        this.renderAlert();
      } else {
        this.onSearchShop();
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: { message: "Error in Home.requestAllPermissions" },
      });
      console.warn(err);
    }
  };
  onCloseWarningModal = () => this.setState({ openWarningModal: false });
  onCloseAppInfoModal = () => this.setState({ show_app_info_modal: false });

  _handleNetworkStateChange = async networkState => {
    const { isConnected } = networkState;
    this.setState({ isConnected, openWarningModal: !isConnected });

    try {
      if (isConnected) {
        this.NetworkStateAudio?.stopAsync();

        const { onLoadPersonnelInfo } = this.props.context;
        const personnelID = await LocalStorage.getItemFromStorage(
          "personnelID",
        );
        const shopID = (await LocalStorage.getItemFromStorage("shopID")) ?? "";
        const address =
          (await LocalStorage.getItemFromStorage("address")) ?? "";
        const name = (await LocalStorage.getItemFromStorage("name")) ?? "";
        const { personnel = {}, success } = await GetShopPersonnelInfo({
          personnelID,
          shopID,
        });
        const { navigation } = this.props;
        try {
          if (shopID !== null && personnelID) {
            this.setState({ shopID });

            if (Object.keys(personnel).length > 0 && success) {
              LocalStorage.saveItemIntoStorage("personnelID", personnelID).then(
                () => {
                  onLoadPersonnelInfo(shopID);
                },
              );
            } else {
              navigation.navigate("PersonnelPin", { shopID, name, address });
            }
          } else {
            console.log("cc:");
          }
        } catch (error) {
          console.error("Error getting shopID from AsyncStorage:", error);
        }
      } else {
        this.NetworkStateAudio?.playAsync();
      }
    } catch (err) {
      console.log("handleNetworkStateChange audio err ", err);
    }
  };

  async componentDidMount() {
    this.networkStateListener = NetInfo.addEventListener(
      this._handleNetworkStateChange,
    );
    const capturedImage = await LocalStorage.getItemFromStorage(
      "capturedImage",
    );
    this.setState({ capturedImage });
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
  }
  componentWillUnmount() {
    if (this.networkStateListener) {
      this.networkStateListener();
    }

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  renderAlert = () => {
    if (this.state.show_modal) {
      Alert.alert(
        "Allow Nearby Devices",
        "You need to allow nearby devices permission to the application \n\nClick Open Setting -> Click Permission -> Click and Allow Nearby Devices",
        [
          { text: "No", style: "cancel" },
          {
            text: "Open Setting",
            onPress: () => {
              this.openSettings();
              this.setState({ show_modal: false });
            },
          },
        ],
      );
    }
  };

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  onSearchShop = async () => {
    if (String(this.state.shopName || this.state.shopID)) {
      await AsyncStorage.setItem("shopID", this.state.shopID);
      this.setState({ showSearchResult: true });
    }
  };

  onChangeSearchType = queryType => {
    this.setState({ searchBy: queryType, shopID: "", shopName: "" });
  };

  renderWelcomeForm = () => {
    return (
      <React.Fragment>
        <View style={Styles.welcomeLogo}>
          <SkipliLogoWithTextIcon
            width={responsiveWidth(12)}
            height={responsiveHeight(8)}
          />
        </View>
        <View style={Styles.searchContainer}>
          <TextInput
            onChangeText={this.onChangeSearchQuery}
            onSubmitEditing={this.requestAllPermissions}
            label={
              this.state.searchBy === "name" ? "Store Name" : "Store ID"
            }
            mode="outlined"
            value={
              this.state.searchBy === "id"
                ? this.state.shopID
                : this.state.shopName
            }
            containerStyle={Styles.inputBackgroundColor}
          />
          <RadioButton.Group
            onValueChange={this.onChangeSearchType}
            value={this.state.searchBy}>
            <View style={Styles.radioBtnContainer}>
              <Text style={{ fontSize: responsiveFontSize(1) }}>
                Search Store By:{" "}
              </Text>
              <View style={Styles.radioBtn}>
                <RadioButton value="name" color={colors.primary} />
                <Text style={Styles.label}>Name</Text>
              </View>
              <View style={Styles.radioBtn}>
                <RadioButton value="id" color={colors.primary} />
                <Text style={Styles.label}>ID</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <Button
          labelStyle={Styles.btnLabel}
          mode="contained"
          style={Styles.accessBtn}
          onPress={this.requestAllPermissions}>
          Access Your Store
        </Button>
      </React.Fragment>
    );
  };

  render() {
    const {
      isConnected,
      showSearchResult,
      shopID,
      shopName,
      capturedImage = "",
    } = this.state;

    return isConnected ? (
      <DismissKeyBoard>
        <View style={Styles.container}>
          <View style={Styles.formContainer}>
            {showSearchResult ? (
              <HomeScreenModules.SearchResults
                onBackToMainScreen={() =>
                  this.setState({ showSearchResult: false })
                }
                onChangeSearchQuery={this.onChangeSearchQuery}
                onChangeSearchType={this.onChangeSearchType}
                searchBy={this.state.searchBy}
                shopID={shopID}
                shopName={shopName}
                {...this.props} // Passing down navigation props
              />
            ) : (
              this.renderWelcomeForm()
            )}
          </View>
          <Image source={{ uri: BKG_IMG_URL }} style={Styles.backgroundImg} />
          <TouchableOpacity
            style={Styles.versionContainer}
            onPress={() => this.setState({ show_app_info_modal: true })}>
            <Text style={Styles.versionText}>
              v {`${deviceInfoModule.getVersion()}`}
            </Text>
          </TouchableOpacity>
          <Modals.AppInfoModal
            isVisible={this.state.show_app_info_modal}
            onClose={this.onCloseAppInfoModal}
          />
        </View>
      </DismissKeyBoard>
    ) : (
      <View>
        <Image
          source={{ uri: capturedImage }}
          style={{ width: 860, height: 490 }}
        />
        <PageMsg>
          {this.state.openWarningModal && (
            <Modals.WarningModal
              onCloseModal={this.onCloseWarningModal}
              contentDescription="Connection Lost"
              imgSource={require("assets/Images/connection-error.png")}
              message="Wifi connection was lost."
              showButtons
              submitBtnLabel="open settings"
              onSubmit={() => {
                AndroidOpenSettings.wifiSettings();
              }}
            />
          )}
        </PageMsg>
      </View>
    );
  }
}
export default withContext(AuthInterfaceConsumer)(Home);
