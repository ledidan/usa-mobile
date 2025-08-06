import React, { Component, useRef } from "react";
import io from "socket.io-client";
import { del, set } from "object-path-immutable";
import NetInfo from "@react-native-community/netinfo";
import { getPowerState, getBatteryLevel } from "react-native-device-info";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AndroidOpenSettings from "react-native-android-open-settings";
import { AppState, NativeEventEmitter, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sentry from "@sentry/react-native";

const { LocalStorage } = Functions;

const DeviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import ViewShot from "react-native-view-shot";

import SideBar from "./SideBar";
//screens
import {
  Settings,
  ShopOrders,
  SupportScreen,
  Tutorial,
  Menu,
  AppInfo,
  YourStore,
} from "screens";
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
//Helper Functions
import {
  _setAudioMode,
  _loadAudio,
  _StartBackgroundTask,
  _verifyShopBasicInfo,
  _startBackgroundTask,
  withNavigationHOC,
} from "./HelperFunctions";

//Fields
import { KeepAwake } from "fields";

//Lib
import { Functions, Services, Constants } from "lib";
const TestReceipt = Constants.TEST_RECEIPT;

//Context
import { MerchantInterfaceProvider } from "context";

//compoment
import { Modals } from "components";
import { responsiveWidth } from "react-native-responsive-dimensions";

//Style
import Style from "./style";
import { Linking, Alert } from "react-native";
import { Button } from "react-native-paper";
import codePush from "react-native-code-push";

const Drawer = createDrawerNavigator();

class Main extends Component {
  socket = io(Services.SOCKET_IO_URL);
  socket2 = io(Services.SKIPLI_DASHBOARD_SOCKET_IO_URL);
  _isMounted = false;
  powerStateListener;
  powerLevelListener;
  networkStateListener;
  OrderAudio;
  PowerStateAudio;
  PowerLevelAudio;
  NetworkStateAudio;
  constructor(props) {
    super(props);
    this.viewShotRef = React.createRef();
    this.colorAnim = new Animated.Value(0);
    this.drawerRef = React.createRef();

    this.state = {
      auto_accept_new_order: false,
      activeOrders: {},
      initialOrdersLoaded: false,
      addedPrinters: {},
      blePrinters: [],
      isSocketConnected: true,
      isPlayingOrderAudio: false,
      isConnected: true,
      shopBasicInfo: this.props.shopBasicInfo,
      orderStatusHasUpdated: false,
      show_modal: false,
      capturedImage: null,
      is_battery_low: false,
      hidden_alert: false,
      isCharging: false,
      drawerOpen: true,
      selectedScreen: "LiveOrders",
    };
  }
  handleSelectScreen = screen => {
    this.setState({ selectedScreen: screen });
  };

  captureScreen = async () => {
    try {
      const result = await this.viewShotRef.current.capture();
      this.setState({ capturedImage: result });
      await LocalStorage.saveItemIntoStorage("capturedImage", result);
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };
  renderDrawer = () => {
    return <View style={Style.drawerStyle}>{this.renderSideBar()}</View>;
  };

  requestAllPermissions = async () => {
    const { _initBlePrinter } = Functions;

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
        // AppState.addEventListener("focus", this._handleAppOnFocus);
        const { isBluetoothEnabled = false } = this.props;
        if (isBluetoothEnabled) {
          _initBlePrinter()
            .then(devices => {
              this.setState({ blePrinters: devices });
            })
            .catch(err => console.log("BLEPrinter Init Error ==>", err));
        }
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: { message: "Error in Main.requestAllPermissions" },
      });
      console.warn(err);
    }
  };

  openSettings = async () => {
    await Linking.openSettings();
    this.setState({ show_modal: false });
  };
  renderAlert = () => {
    if (this.state.show_modal) {
      Alert.alert(
        "Allow Nearby Devices",
        "You need to allow nearby devices permission to the application \n\nClick Open Setting -> Click Permission -> Click and Allow Nearby Devices",
        [
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
  handleCheckUpdateNextpush = () => {
    const { ShowConfirmNotifBottom } = Functions;
    console.log("➡️ Starting CodePush update check");
    ShowConfirmNotifBottom({
      title: "Check",
      message: "Checking for updates...",
      type: "info",
      options: {
        autoHide: false,
      },
    });

    codePush
      .checkForUpdate()
      .then(update => {
        if (!update) {
          console.log("ℹ️ No update available");

          ShowConfirmNotifBottom({
            title: "Notice",
            message: "You are using the latest version.",
            type: "info",
            options: {
              visibilityTime: 10000,
            },
            button: (
              <TouchableOpacity onPress={() => codePush.restartApp()}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "white",
                    paddingBottom: 2,
                  }}>
                  Restart app
                </Text>
              </TouchableOpacity>
            ),
          });
        } else {
          ShowConfirmNotifBottom({
            title: "Update Available",
            message:
              "Downloading the update...\nPlease keep this screen active for about 3 minutes.",
            type: "info",
            options: {
              autoHide: false,
            },
          });

          codePush.sync(
            {
              installMode: codePush.InstallMode.ON_NEXT_RESTART,
              updateDialog: false,
            },
            null,
            progress => {
              console.log(
                `📶 Progress: ${progress.receivedBytes} / ${progress.totalBytes}`,
              );
            },
          );
          setTimeout(() => {
            ShowConfirmNotifBottom({
              title: "Update Installed",
              message: "Update installed. Restarting now...",
              type: "success",
            });

            setTimeout(() => {
              codePush.restartApp();
            }, 10000);
          }, 170000);
        }
      })
      .catch(error => {
        console.error("❌ Error during update check:", error);
        ShowConfirmNotifBottom({
          title: "Error",
          message: "An error occurred during the update process.",
          type: "error",
        });
      });
  };

  componentDidMount() {
    const { _initLanPrinter } = Functions;
    this.onLoadAudio();
    this.requestAllPermissions();
    this.checkForAutoAcceptNewOrders();
    //start Background Task
    _startBackgroundTask(this._backroundTask, 420);
    this.onCheckNetworkState();
    this.onGetActiveOrders();
    this.onGetMobileAppActivePrinters();
    if (this.drawerRef.current) {
      this.drawerRef.current.openDrawer();
    }
    // Check the socket and get updates
    if (!this.socket) this.setState({ isSocketConnected: false });
    this.socket.connect();
    this.onCheckUpdatesFromSocket();
    this.checkBatteryLevel();
    this.powerLevelListener = DeviceInfoEmitter.addListener(
      "RNDeviceInfo_powerStateDidChange",
      this._handleUpdateBatteryLevel,
    );
    this.powerStateListener = DeviceInfoEmitter.addListener(
      "RNDeviceInfo_powerStateDidChange",
      this._handlePowerStateChange,
    );

    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
    this.networkStateListener = NetInfo.addEventListener(
      this._handleNetworkStateChange,
    );

    _initLanPrinter();
  }
  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  componentWillUnmount() {
    // AppState.removeEventListener('focus', this._handleAppOnFocus);
    this.powerStateListener && this.powerStateListener.remove();
    this.networkStateListener && this.networkStateListener();
    this.onUnloadAudio();
    clearInterval(this.interval);

    this.setState = () => {
      return;
    };
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onCloseWarningBatteryModal = async () => {
    await this.PowerStateAudio?.stop();
    this.setState({ is_battery_low: false, hidden_alert: true });
  };
  onShowWarningBatteryModal = async () => {
    await this.PowerStateAudio?.play();
    this.setState({ is_battery_low: true, hidden_alert: false });
  };

  _backroundTask = () => {
    const { shopID } = this.props;
    this.socket.on(`${shopID}-add-order-to-active-orders`, this.onAddNewOrder);
  };
  _handleAppOnFocus = () => {
    //When app come back to foreground from background. E.g: User open the app or switch from others app
    const { _getBlePrinters } = Functions;
    const { isBluetoothEnabled = false } = this.props;
    if (isBluetoothEnabled) {
      _getBlePrinters()
        .then(devices => {
          this.setState({ blePrinters: devices });
        })
        .catch(err => {
          console.log("Error when app focus", err);
          this.setState({ blePrinters: [] });
        });
    }
  };

  _handleUpdateBatteryLevel = batteryLevel => {
    try {
      if (batteryLevel < 0.22) {
        this.setState({ is_battery_low: true, hidden_alert: false });
        if (this.PowerStateAudio) {
          this.PowerStateAudio.setNumberOfLoops(-1);
          this.PowerStateAudio.play(success => {
            if (!success) {
              console.log("handlePowerStateChange: Playback failed");
            }
          });
        }
      } else {
        this.setState({ is_battery_low: false, hidden_alert: false });

        if (this.PowerStateAudio) {
          this.PowerStateAudio.stop(() => {
            console.log("handlePowerStateChange: Audio stopped");
          });
        }
      }
    } catch (err) {
      console.log("handlePowerStateChange audio err", err);
    }
  };

  _handlePowerStateChange = async batteryState => {
    try {
      if (
        batteryState !== "charging" &&
        batteryState !== "full" &&
        batteryState !== "unknown"
      ) {
        this.setState({ isUnplugged: true, isCharging: false });
        this.checkBatteryLevel();
        this.powerLevelListener = DeviceInfoEmitter.addListener(
          "RNDeviceInfo_powerStateDidChange",
          this._handleUpdateBatteryLevel,
        );
        this.interval = setInterval(this.checkBatteryLevel, 900000);
      } else {
        this.setState({
          isUnplugged: false,
          isCharging: true,
        });
      }
    } catch (err) {
      console.log("handlePowerStateChange audio err ", err);
    }
  };
  _handleNetworkStateChange = async networkState => {
    const { isConnected } = networkState;
    const { shopBasicInfo } = this.state;
    const { name, address } = shopBasicInfo;
    const { shopID } = this.props;
    this.setState({ isConnected, openWarningModal: !isConnected });
    try {
      if (isConnected) {
        this.NetworkStateAudio?.stop();
      } else {
        await this.captureScreen();
        await LocalStorage.saveItemIntoStorage("address", address);
        await LocalStorage.saveItemIntoStorage("name", name);
        await LocalStorage.saveItemIntoStorage("shopID", shopID);
        this.NetworkStateAudio?.play();
      }
    } catch (err) {
      console.log("handleNetworkStateChange audio err ", err);
    }
  };

  onCheckNetworkState = () => {
    NetInfo.fetch().then(state => {
      this._handleNetworkStateChange(state);
    });
  };
  checkBatteryLevel = async () => {
    const powerState = await getPowerState();
    const { batteryLevel = "" } = powerState;
    this._handleUpdateBatteryLevel(batteryLevel);
  };

  onCheckPowerState = async () => {
    const powerState = await getPowerState();
    const { batteryState = "unplugged" } = powerState;
    this._handlePowerStateChange(batteryState);
  };

  onCheckForUpdate = async () => {
    this.setState({ is_update_app: true });
  };
  onCheckUpdatesFromSocket = () => {
    const { shopID } = this.props;
    this.socket2.on("new-app-version-from-store", this.onCheckForUpdate);

    this.socket.on(`${shopID}-add-order-to-active-orders`, this.onAddNewOrder);
    this.socket.on(`${shopID}-change-status-of-active-order`, data =>
      this.onChangeStatusOfActiveOrder(data),
    );
    this.socket.on(`${shopID}-close-an-order`, this.onCloseAnOrder);
  };
  onGetActiveOrders = async () => {
    const { GetShopOrders } = Services.Merchants.GetRequests;
    const { OrdersManagement } = Functions;
    const { RankActiveOrders } = OrdersManagement;
    const { orders } = await GetShopOrders({
      ordersType: "active",
      shopID: this.props.shopID,
    });
    this.setState({
      activeOrders: RankActiveOrders(orders),
      initialOrdersLoaded: true,
    });
  };

  onUpdateAddedPrinters = newAddedPrinters =>
    this.setState({ addedPrinters: newAddedPrinters });

  onAddNewOrder = ({ orderDetails = {}, orderID = "" }) => {
    const { OrdersManagement } = Functions;
    const { RankActiveOrders } = OrdersManagement;

    if (orderID && Object.keys(orderDetails).length > 0) {
      if (this.OrderAudio) {
        this.OrderAudio.setNumberOfLoops(-1);
        this.OrderAudio.play(success => {
          if (!success) {
            console.log("On Add New Order, audio err (playback failed)");
          }
        });
      }

      const { activeOrders = {} } = this.state;
      const result = set(activeOrders, `${orderID}`, orderDetails);
      this.setState({ activeOrders: RankActiveOrders(result) });
    }
  };

  onChangeStatusOfActiveOrder = ({ nextStatus = "", orderID = "" }) => {
    const { auto_accept_new_order = false } = this.state;

    if (orderID && nextStatus) {
      if (this.OrderAudio) {
        this.OrderAudio.stop(() => {
          console.log("On Active Order Status change, audio err");
        });
      }

      if (!auto_accept_new_order) {
        const { activeOrders = {} } = this.state;
        if (activeOrders[orderID]) {
          this.setState({
            activeOrders: set(activeOrders, `${orderID}.status`, nextStatus),
          });
        }
      }
    }
  };

  onCloseAnOrder = (orderID = "") => {
    if (orderID) {
      const { activeOrders = {} } = this.state;
      this.setState({ activeOrders: del(activeOrders, orderID) });
    }
  };

  //[BEGIN] Printer Section
  onGetMobileAppActivePrinters = async () => {
    const { GetShopMobileAppActivePrinters } = Services.Merchants.GetRequests;
    const { addedPrinters = {} } = await GetShopMobileAppActivePrinters({
      shopID: this.props.shopID,
    });
    this.setState({ addedPrinters });
  };

  onAddMobileAppPrinter = async ({ printerInfo, printerID }) => {
    const { AddMobileAppPrinter } = Services.Merchants.PostRequests;
    try {
      const { success } = await AddMobileAppPrinter({
        printerInfo,
        printerID,
        shopID: this.props.shopID,
      });
      if (success) {
        return true;
      } else return false;
    } catch (err) {
      Sentry.captureException(err, {
        extra: {
          message: "Error in Main.onAddMobileAppPrinter",
          printerInfo,
          printerID,
        },
      });
      throw new Error("System Error");
    }
  };
  //[END] PRINTER SECTION

  //[START] AUDIO SECTION
  onLoadAudio = async () => {
    try {
      this.PowerLevelAudio = await _loadAudio("low_battery_audio.mp3");
      this.OrderAudio = await _loadAudio("ding.mp3");
      this.PowerStateAudio = await _loadAudio("low_battery_audio.mp3");
      this.NetworkStateAudio = await _loadAudio("lost_connection.mp3");
    } catch (err) {
      Sentry.captureException(err, {
        extra: { message: "Error in Main.onLoadAudio" },
      });
      console.log(err);
    }
  };
  onUnloadAudio = async () => {
    if (this.OrderAudio) {
      this.OrderAudio.release();
      this.OrderAudio = null;
    }
    if (this.PowerStateAudio) {
      this.PowerStateAudio.release();
      this.PowerStateAudio = null;
    }
    if (this.PowerLevelAudio) {
      this.PowerLevelAudio.release();
      this.PowerLevelAudio = null;
    }
    if (this.NetworkStateAudio) {
      this.NetworkStateAudio.release();
      this.NetworkStateAudio = null;
    }
  };

  playOrderAudio = () => {
    if (this.OrderAudio) {
      this.OrderAudio.setNumberOfLoops(-1);
      this.setState({ isPlayingOrderAudio: true });
      this.OrderAudio.play(success => {
        if (!success) {
          console.log("PlayOrderAudio: Playback failed");
          this.setState({ isPlayingOrderAudio: false });
        }
      });
    }
  };

  stopOrderAudio = () => {
    if (this.OrderAudio) {
      this.OrderAudio.stop(() => {
        this.setState({ isPlayingOrderAudio: false });
      });
    } else {
      console.log("OrderAudio");
    }
  };

  //[END] AUDIO SECTION
  onCloseWarningModal = () => this.setState({ openWarningModal: false });
  onCloseWarningUpdateModal = () => this.setState({ is_update_app: false });

  renderOrdersScreen = (
    navProps,
    Component,
    orderType,
    orderStatusHasUpdated,
  ) => {
    return (
      <MerchantInterfaceProvider
        value={{
          auto_accept_new_order: this.state.auto_accept_new_order,
          addedPrinters: this.state.addedPrinters,
          activeOrders: this.state.activeOrders,
          initialOrdersLoaded: this.state.initialOrdersLoaded,
          onChangeActiveOrders: (activeOrders = {}) =>
            this.setState({ activeOrders }),
          personnel: this.props.personnel,
          shopBasicInfo: this.state.shopBasicInfo,
          shopID: this.props.shopID,
          onGetActiveOrders: this.onGetActiveOrders,
          BleManager: this.props.BleManager,
          selectedScreen: this.state.selectedScreen,
          onSelectScreen: this.handleSelectScreen,
        }}>
        <KeepAwake>
          <Component
            {...navProps}
            {...this.props}
            capturedImage={this.state.capturedImage}
            captureScreen={this.captureScreen}
            orderType={orderType}
            setOrderStatusHasUpdated={() =>
              this.setState({ orderStatusHasUpdated: true })
            }
            unsetOrderStatusHasUpdated={() =>
              this.setState({ orderStatusHasUpdated: false })
            }
            onSelectScreen={this.handleSelectScreen}
            orderStatusHasUpdated={this.state.orderStatusHasUpdated}
          />
        </KeepAwake>
      </MerchantInterfaceProvider>
    );
  };
  checkForAutoAcceptNewOrders = async () => {
    const settings = JSON.parse(await AsyncStorage.getItem("@settings")) || {};
    const { new_order_settings = {} } = settings;
    const { auto_accept_new_order = false } = new_order_settings;
    this.setState({ auto_accept_new_order });
  };

  setAutoAccept = async () => {
    await this.setState({
      auto_accept_new_order: !this.state.auto_accept_new_order,
    });

    const current_settings =
      JSON.parse(await AsyncStorage.getItem("@settings")) || {};
    const updated_settings = {
      ...current_settings,
      new_order_settings: {
        ...current_settings.new_order_settings,
        auto_accept_new_order: this.state.auto_accept_new_order,
      },
    };

    await AsyncStorage.setItem("@settings", JSON.stringify(updated_settings));
  };

  renderSettingsScreen = (navProps, SettingComponent) => (
    <MerchantInterfaceProvider
      value={{
        addedPrinters: this.state.addedPrinters,
        isPlayingOrderAudio: this.state.isPlayingOrderAudio,
        blePrinters: this.state.blePrinters,
        shopID: this.props.shopID,
        BleManager: this.props.BleManager,
        onAddMobileAppPrinter: this.onAddMobileAppPrinter,
        onUpdateAddedPrinters: this.onUpdateAddedPrinters,
        onGetMobileAppActivePrinters: this.onGetMobileAppActivePrinters,
        playOrderAudio: this.playOrderAudio,
        stopOrderAudio: this.stopOrderAudio,
        orderInfo: TestReceipt,
        auto_accept_new_order: this.state.auto_accept_new_order,
        setAutoAccept: this.setAutoAccept,
        shopBasicInfo: {
          timeZone: "America/New_York",
        },
      }}>
      <KeepAwake>
        <SettingComponent {...navProps} {...this.props} />
      </KeepAwake>
    </MerchantInterfaceProvider>
  );
  renderOtherScreen = (navProps, Component) => {
    return (
      <MerchantInterfaceProvider
        value={{
          personnel: this.props.personnel,
          shopBasicInfo: this.state.shopBasicInfo,
          shopID: this.props.shopID,
        }}>
        <KeepAwake>
          <Component
            selectedScreen={this.state.selectedScreen}
            handleCheckUpdateNextpush={this.handleCheckUpdateNextpush}
            {...navProps}
            {...this.props}
          />
        </KeepAwake>
      </MerchantInterfaceProvider>
    );
  };

  renderSideBar = navProps => {
    return (
      <React.Fragment>
        <SideBar
          {...navProps}
          {...this.props}
          selectedScreen={this.state.selectedScreen}
          onSelectScreen={this.handleSelectScreen}
          is_battery_low={this.state.is_battery_low}
          onShowWarningBatteryModal={this.onShowWarningBatteryModal}
          onCloseWarningBatteryModal={this.onCloseWarningBatteryModal}
          hidden_alert={this.state.hidden_alert}
          shopBasicInfo={this.state.shopBasicInfo}
          shopID={this.props.shopID}
          activeOrders={this.state.activeOrders}
          //isWifiEnabled={this.state.isWifiEnabled}
          isConnected={this.state.isConnected}
        />
        {this.state.openWarningModal && (
          <Modals.WarningModal
            onCloseModal={this.onCloseWarningModal}
            contentDescription="Connection Lost"
            imgSource={require("assets/Images/warning-battery.jpg")}
            message={`Wifi connection was lost.\nPlease check your Wi-Fi — try turning it off and on again?`}
            showButtons
            submitBtnLabel="open settings"
            onSubmit={() => {
              AndroidOpenSettings.wifiSettings();
            }}
          />
        )}
        {/* {this.state.isUnplugged && (
          <Modals.WarningModal
            onCloseModal={() => {}}
            contentDescription="Not Connect to Power Source"
            imgSource={{
              uri: "https://media.giphy.com/media/mPPGsVCvHoQm3LHAA0/giphy.gif",
            }}
            message={`Your tablet is not connecting to a power source.\nPlease check the power connection.`}
          />
        )} */}
        {this.state.is_battery_low && (
          <Modals.WarningModal
            onCloseModal={this.onCloseWarningBatteryModal}
            contentDescription="Not Connect to Power Source"
            imgSource={require("assets/Images/warning-battery.jpg")}
            message={`Your tablet's battery is low.\nPlease connect it to a power source immediately.`}
            showButtons
            submitBtnLabel="Ignore"
            is_custom_button
            style={Style.parentStyle}
            onSubmit={this.onCloseWarningBatteryModal}
          />
        )}
        {this.state.is_update_app && (
          <Modals.WarningModal
            onCloseModal={this.onCloseWarningUpdateModal}
            contentDescription="An Update Is Available!"
            showButtons
            submitBtnLabel="Open play store"
            imgSource={require("assets/Images/update_play_store.png")}
            message={`New update is available. Tap open play store to update app from Google Play store.`}
            onSubmit={() => {
              Linking.openURL("market://details?id=com.skipli.dashboardmobile");
            }}
          />
        )}
      </React.Fragment>
    );
  };
  renderContent = () => {
    const { selectedScreen } = this.state;
    let ScreenComponent = null;
    switch (selectedScreen) {
      case "LiveOrders":
        ScreenComponent = () =>
          this.renderOrdersScreen(
            this.props,
            ShopOrders,
            "activeOrders",
            this.state.orderStatusHasUpdated,
          );
        break;
      case "PastOrders":
        ScreenComponent = () =>
          this.renderOrdersScreen(
            this.props,
            ShopOrders,
            "pastOrders",
            this.state.orderStatusHasUpdated,
          );
        break;
      case "Menu":
        ScreenComponent = () => this.renderOtherScreen(this.props, Menu);
        break;
      case "YourStore":
        ScreenComponent = () => this.renderOtherScreen(this.props, YourStore);
        break;
      case "Tutorial":
        ScreenComponent = () => this.renderOtherScreen(this.props, Tutorial);
        break;
      case "Settings":
        ScreenComponent = () => this.renderSettingsScreen(this.props, Settings);
        break;
      case "AppInfo":
        ScreenComponent = () => this.renderOtherScreen(this.props, AppInfo);
        break;
      case "SupportScreen":
        ScreenComponent = () =>
          this.renderOtherScreen(this.props, SupportScreen);
        break;
      default:
        ScreenComponent = () =>
          this.renderOrdersScreen(
            this.props,
            ShopOrders,
            "activeOrders",
            this.state.orderStatusHasUpdated,
          );
    }

    return <ScreenComponent />;
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={Style.sidebarContainer}>{this.renderSideBar()}</View>
        <View style={Style.contentContainer}>{this.renderContent()}</View>
      </View>
    );
  }
}
export default withNavigationHOC(Main);
