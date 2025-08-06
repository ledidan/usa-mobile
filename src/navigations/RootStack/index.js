import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Toast, {BaseToast} from 'react-native-toast-message';
import {BleManager} from 'react-native-ble-plx';
import Authentication from '../Authentication';
import Main from '../Main';
import {LiveShopNotAllowed, TestShopNotAllowed} from './HelperFunctions';
// import * as ScreenOrientation from 'expo-screen-orientation';
// Sentry 
import * as Sentry from '@sentry/react-native';
//Style
import colors from 'styles/_variables';
import Style from './style';
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: colors.black_light,
    background: '#edf6fa',
  },
};
//Components
import {AuthLoading} from 'components';

//Context
import {AuthInterfaceProvider} from 'context';

//Lib
import {Constants, Functions, Services} from 'lib';
import {PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';
import {Alert, Linking} from 'react-native';
import ViewShot from 'react-native-view-shot';
const {LocalStorage} = Functions;
const {Merchants} = Services;
const {GetShopPersonnelInfo, GetShopBasicInfo} = Merchants.GetRequests;

class RootStack extends Component {
  bluetoothManager = new BleManager();
  bletoothStateListener;
  state = {
    shopID: '',
    personnelID: '',
    personnel: null,
    shopBasicInfo: {},
    isFindingPersonnel: false,
    isFindingShopBasicInfo: false,
    isBluetoothEnabled: true,
    show_modal: false,
  };
  openSettings = async () => {
    await Linking.openSettings();
    this.setState({show_modal: false});
  };
  renderAlert = () => {
    if (this.state.show_modal) {
      Alert.alert(
        'Allow Nearby Devices',
        'You need to allow nearby devices permission to the application \n\nClick Open Setting -> Click Permission -> Click and Allow Nearby Devices',
        [
          {text: 'No', style: 'cancel'},
          {
            text: 'Open Setting',
            onPress: () => {
              this.openSettings();
              this.setState({show_modal: false});
            },
          },
        ],
      );
    }
  };

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
        this.enableBle();
      }
    } catch (err) {
       Sentry.captureException(err, {
         extra: { message: "Error in RootStack.requestAllPermissions" },
       });
      console.warn(err);
    }
  };
  componentDidMount() {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    this.fetchInfo();
    this.requestAllPermissions();
    this.bletoothStateListener = this.bluetoothManager.onStateChange(
      this.onBleStateChange,
    );
  }
  componentDidUpdate(prevProp, prevState) {
    if (this.state.personnel !== prevState.personnel)
      this.onValidateShop(this.state.shopID);
  }
  componentWillUnmount() {
    if (this.bletoothStateListener) {
      this.bletoothStateListener.remove();
    }
    this.setState = () => {
      return;
    };
  }
  fetchInfo = async () => {
    try {
      const shopID = await LocalStorage.getItemFromStorage('shopID');
      this.setState({ shopID });
      const inValid = this.onValidateShop(shopID);
      if (inValid) return;
      await this.onGetShopBasicInfo(shopID);
      await this.onGetPersonnelInfo(shopID);
    } catch (error) {
      Sentry.captureException(err, {
        extra: { message: "Error in RootStack.fetchInfo" },
      });
    }
  };
  enableBle = () => {
    this.bluetoothManager
      .enable('12345')
      .then(data => {
        if (data) {
          this.setState({isBluetoothEnabled: true});
        }
      })
      .catch(() => this.setState({isBluetoothEnabled: false}));
  };
  onBleStateChange = bleState => {
    if (bleState !== 'poweredOn') {
      //this.enableBle();
      this.setState({isBluetoothEnabled: false});
    }
  };
  onValidateShop = shopID => {
    const {TEST_SHOP_IDS} = Constants;
    const {LIVE_MODE_ENABLED} = Services;
    if (LIVE_MODE_ENABLED() && TEST_SHOP_IDS.includes(shopID) && shopID) {
      //Test shop in Live mode
      this.setState({showTestShopInLiveModeWarning: true});
      return true;
    } else if (
      !LIVE_MODE_ENABLED() &&
      !TEST_SHOP_IDS.includes(shopID) &&
      shopID
    ) {
      //Live shop in test mode
      this.setState({showLiveShopInTestModeWarning: true});
      return true;
    }
  };
  onGetPersonnelInfo = async shopID => {
    this.setState({isFindingPersonnel: true, shopID});
    const personnelID = await LocalStorage.getItemFromStorage('personnelID');
    if (!personnelID) {
      this.setState({personnel: null, isFindingPersonnel: false});
      return;
    }
    const {personnel = {}, success} = await GetShopPersonnelInfo({
      personnelID,
      shopID,
    });
    if (Object.keys(personnel).length === 0 || !success) {
      this.setState({personnel: null, isFindingPersonnel: false});
      return;
    } else {
      this.setState({isFindingPersonnel: false, personnel}, () => {
        if (Object.keys(this.state.shopBasicInfo).length === 0) {
          this.onGetShopBasicInfo(shopID);
        }
        // Sentry
        Sentry.setTag("personnel_id", personnelID);
        Sentry.setContext("personnel_info", personnel);
      });
      return;
    }
  };
  onGetShopBasicInfo = async shopID => {
    this.setState({isFindingShopBasicInfo: true});
    if (!shopID) {
      this.setState({shopID: '', isFindingShopBasicInfo: false});
      return;
    }
    const {shopBasicInfo = {}} = await GetShopBasicInfo({shopID});
    this.setState({shopBasicInfo, shopID}, () => {
      this.setState({isFindingShopBasicInfo: false});
    });
    // Sentry
    Sentry.setContext("shop_info", shopBasicInfo);
    Sentry.setTag("shop_id", shopID);
  };

  onRefreshShopBasicInfo = async shopID => {
    const { shopBasicInfo = {} } = await GetShopBasicInfo({ shopID });
    this.setState({ shopBasicInfo });
  };

  onBack = async () => {
    //reset the state and remove item from the storage
    await LocalStorage.saveItemIntoStorage('shopID', null);
    await LocalStorage.saveItemIntoStorage('personnelID', null);
    await LocalStorage.saveItemIntoStorage('capturedImage', null);
    await LocalStorage.saveItemIntoStorage('address', null);
    await LocalStorage.saveItemIntoStorage('name', null);
    this.setState({
      shopID: '',
      personnelID: '',
      personnel: null,
      shopBasicInfo: {},
      isFindingPersonnel: false,
      isFindingShopBasicInfo: false,
      showLiveShopInTestModeWarning: false,
      showTestShopInLiveModeWarning: false,
    });
  };
  onRemovePersonnelInfo = () => {
    const {LocalStorage} = Functions;
    this.setState({personnel: null}, () =>
      LocalStorage.saveItemIntoStorage('personnelID', null),
    );
  };
  toastConfig = {
    success: ({text1, text2, props, ...rest}) => (
      <BaseToast
        {...rest}
        style={Style.success}
        contentContainerStyle={Style.contentContainner}
        text1Style={Style.title}
        text2Style={Style.message}
        text1={text1}
        text2={text2}
        leadingIcon={require('assets/Images/success.png')}
        trailingIcon={require('assets/Images/delete.png')}
        trailingIconStyle={Style.tralingIcon}
        leadingIconStyle={Style.leadingIcon}
        onTrailingIconPress={rest.onPress}
      />
    ),
    error: ({text1, text2, props, onPress, ...rest}) => {
      const {
        displayType,
        disableTrallingIcon = false,
        disableLeadingIconPress = false,
      } = props;
      return (
        <BaseToast
          {...rest}
          style={displayType === 'warning' ? Style.warning : Style.error}
          contentContainerStyle={Style.contentContainner}
          text1Style={Style.title}
          text2Style={Style.message}
          text1={text1}
          text2={text2}
          leadingIcon={
            displayType === 'warning'
              ? require('assets/Images/warning.png')
              : require('assets/Images/error.png')
          }
          leadingIconStyle={Style.leadingIcon}
          trailingIcon={require('assets/Images/delete.png')}
          trailingIconStyle={
            disableTrallingIcon ? Style.disable : Style.tralingIcon
          }
          onTrailingIconPress={() => !disableTrallingIcon && onPress()}
          onLeadingIconPress={() => !disableLeadingIconPress && onPress()}
        />
      );
    },
    info: ({text1, text2, props, ...rest}) => {
      return (
        <BaseToast
          {...rest}
          style={Style.info}
          contentContainerStyle={Style.contentContainner}
          text1Style={Style.title}
          text2Style={Style.message}
          text1={text1}
          text2={text2}
          leadingIcon={require('assets/Images/information.png')}
          trailingIcon={require('assets/Images/delete.png')}
          trailingIconStyle={Style.tralingIcon}
          leadingIconStyle={Style.leadingIcon}
          onTrailingIconPress={rest.onPress}
        />
      );
    },
  };
  render() {
    const {
      shopID,
      personnelID,
      personnel,
      shopBasicInfo,
      isFindingPersonnel,
      isFindingShopBasicInfo,
    } = this.state;
    if (isFindingPersonnel || isFindingShopBasicInfo) {
      return <AuthLoading />;
    } else if (this.state.showLiveShopInTestModeWarning) {
      return <LiveShopNotAllowed onBack={this.onBack} />;
    } else if (this.state.showTestShopInLiveModeWarning)
      return <TestShopNotAllowed onBack={this.onBack} />;

    return (
      <NavigationContainer theme={navTheme}>
        {!personnelID && !personnel ? (
          <AuthInterfaceProvider
            value={{
              onLoadPersonnelInfo: this.onGetPersonnelInfo,
              onValidateShop: this.onValidateShop,
            }}>
            <Authentication />
          </AuthInterfaceProvider>
        ) : (
          <Main
            personnel={personnel}
            shopBasicInfo={shopBasicInfo}
            shopID={shopID}
            onLogout={this.onBack}
            isBluetoothEnabled={this.state.isBluetoothEnabled}
            BleManager={this.bluetoothManager}
            onRefreshShopBasicInfo={this.onRefreshShopBasicInfo}
          />
        )}
        <Toast config={this.toastConfig} ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  }
}
export default RootStack;
