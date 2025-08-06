import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {Text} from 'react-native-paper';
import {DrawerItem} from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';
import {NAV_ITEMS} from './HelperFunctions';

//Icons
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SkipliLogoWithTextIcon, WarningBatteryIcon} from 'assets/Icons';

//Style
import {Style, drawer} from './style';
import colors from 'styles/_variables';

//lib
import {Functions} from 'lib';
const {LocalStorage} = Functions;

//Components
import { Modals, StoreID } from 'components';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {tapCounts: 0, openLogoutModal: false};
    this.colorAnim = new Animated.Value(0);
  }
  componentDidMount() {
    this.startBlinking();
  }

  onToggleBetaMode = (mode = 0) => {
    const {tapCounts} = this.state;
    if (tapCounts === 6) {
      LocalStorage.saveItemIntoStorage('BETA_MODE_ENABLED', 'true').then(() => {
        Alert.alert('Beta Testing Enabled');
        this.setState({tapCounts: 0});
      });
    } else if (tapCounts === -6) {
      LocalStorage.saveItemIntoStorage('BETA_MODE_ENABLED', null).then(() => {
        Alert.alert('Beta Testing Disabled');
        this.setState({tapCounts: 0});
      });
    }
    this.setState(prevState => ({
      tapCounts: mode === 1 ? prevState.tapCounts + 1 : prevState.tapCounts - 1,
    }));
  };

  startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.colorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(this.colorAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  onCloseLogoutModal = () => {
    this.setState({openLogoutModal: false});
  };
  onLogout = () => {
    this.setState({openLogoutModal: true});
  };
  renderStoreInfo = () => {
    const { id = '', name = '' } = this.props.shopBasicInfo;
    return (
      <View style={Style.infoContainer}>
        <TouchableOpacity
          onPress={() => this.props.onSelectScreen("YourStore")}>
          <StoreID shopId={id} />
          <View style={Style.textRow}>
            <Text style={Style.address}>{name}</Text>
            <MaterialCommIcons
              name="chevron-right"
              size={responsiveFontSize(1.8)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderTextLabel = ({color, isActive, label, route = '', icon}) => {
    const {activeOrders = {}} = this.props;
    const numActiveOrders = Object.keys(activeOrders).length;
    return (
      <View style={Style.labelContainer}>
        <MaterialCommIcons
          name={icon}
          color={isActive ? colors.primary : color}
          size={responsiveWidth(2)}
          style={{ marginRight: '8%', marginLeft: '5%' }}
        />
        <Text
          style={[{ color: isActive ? colors.primary : color }, Style.label]}>
          {label}
        </Text>
        {route === 'LiveOrders' && (
          <Text
            style={[
              { color: isActive ? colors.primary : color },
              Style.notifLabel,
              numActiveOrders > 0 && Style.notifLabelBackground,
            ]}>
            {numActiveOrders > 0 ? numActiveOrders : ''}
          </Text>
        )}
      </View>
    );
  };
  renderDrawerItem = (route, label, icon, id) => {
    const isActive = this.props.selectedScreen === route;

    return (
      <DrawerItem
        key={id}
        pressOpacity={0.6}
        // pressColor={colors.primary_light}
        {...drawer.contentOptions}
        label={({color}) =>
          this.renderTextLabel({color, isActive, label, route, icon})
        }
        onPress={() => this.props.onSelectScreen(route)}
        style={[Style.drawerItem, isActive && Style.drawerItemActive]}
      />
    );
  };

  renderDrawerActionItem = (action, label, icon) => (
    <DrawerItem
      pressOpacity={0.2}
      pressColor={colors.primary_light}
      {...drawer.contentOptions}
      label={({color, isActive}) =>
        this.renderTextLabel({color, isActive, label, icon})
      }
      onPress={action}
      style={Style.drawerItem}
    />
  );
  renderFooter = () => {
    const {HelpActions} = Functions;
    return (
      <View style={Style.helpFooter}>
        <TouchableOpacity
          style={Style.helpContainer}
          onPress={() => this.props.onSelectScreen('SupportScreen')}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}>
            <MaterialCommIcons
              name="frequently-asked-questions"
              size={responsiveWidth(1.6)}
              color={colors.white}
            />
            <Text style={Style.helpText}>Request support</Text>
          </View>
          <MaterialCommIcons
            name="chevron-right"
            size={responsiveWidth(1.8)}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.helpContainer}
          onPress={() => HelpActions('6789996082')}>
          <MaterialCommIcons
            name="phone"
            size={responsiveWidth(1.6)}
            color={colors.white}
          />
          <Text style={Style.helpText}>(678) 999-6082</Text>
        </TouchableOpacity>
        <View style={Style.helpContainer}>
          <Text style={Style.versionText}>v {`${DeviceInfo.getVersion()}`}</Text>
        </View>
      </View>
    );
  };
  handlePress = () => {
    this.colorAnim.setValue(0);
    this.startBlinking();
    this.props.onShowWarningBatteryModal();
  };
  renderNavItems = () => {
    return Object.keys(NAV_ITEMS).map(key => {
      const {route, label, icon} = NAV_ITEMS[key];

      return (
        <TouchableOpacity
          key={route}
          onPress={() => this.props.onSelectScreen(route)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <MaterialCommIcons name={icon} size={24} style={{marginRight: 10}} />
          <Text>{label}</Text>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const backgroundColor = this.colorAnim.interpolate({
      inputRange: [0, 9],
      outputRange: ['#FFF95E', '#FF0000'],
    });
    return (
      <View style={Style.container}>
        <View style={Style.header}>
          <View style={Style.logo}>
            <TouchableOpacity onPress={() => this.onToggleBetaMode(1)}>
              <SkipliLogoWithTextIcon
                width={responsiveWidth(8)}
                height={responsiveHeight(5)}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          {this.props.hidden_alert && (
            <Animated.View
              style={[Style.icon_battery_container, {backgroundColor}]}>
              <View style={Style.icon_battery}>
                <TouchableOpacity onPress={this.handlePress}>
                  <WarningBatteryIcon
                    width={responsiveWidth(1.9)}
                    height={responsiveHeight(3)}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          <TouchableOpacity
            style={Style.betaBtn}
            onPress={this.onToggleBetaMode}>
            <View></View>
          </TouchableOpacity>
        </View>
        {this.renderStoreInfo()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.scrollViewContainer}>
          {Object.keys(NAV_ITEMS).map(id => {
            const {route, label, icon} = NAV_ITEMS[id];
            return this.renderDrawerItem(route, label, icon, id);
          })}
          {this.renderDrawerActionItem(
            this.onLogout,
            'Logout',
            'account-arrow-right',
          )}
        </ScrollView>
        {this.renderFooter()}
        {this.state.openLogoutModal && (
          <Modals.ConfirmOwnerPinModal
            onCloseModal={this.onCloseLogoutModal}
            onCallback={this.props.onLogout}
            shopID={this.props.shopID}
          />
        )}
      </View>
    );
  }
}
