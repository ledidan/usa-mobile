import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AllItems from './AllItems';
import TabBarMenu from './TabBarMenu';

//style
import colors from 'styles/_variables';
import Style from './style';

//Lib
import {Constants} from 'lib';
const {MENUS_MANAGEMENT_NAVBAR_ITEMS} = Constants;

const TopTabNav = createMaterialTopTabNavigator();

function TabBar(props) {
  const renderComponent = ({id, navProps}) => {
    const {shopID} = props;
    switch (id) {
      case 'allItems':
        return <AllItems {...navProps} shopID={shopID} />;
      default:
        return (
          <View>
            <Text>Default Text</Text>
          </View>
        );
    }
  };
  const renderNavItem = (item, index) => {
    const {label, id} = item;

    return (
      <TopTabNav.Screen
        name={id}
        key={`${id}.${index}`}
        options={{tabBarLabel: label}}>
        {navProps => renderComponent({id, navProps})}
      </TopTabNav.Screen>
    );
  };
  return (
    <TopTabNav.Navigator
      initialRouteName="Items"
      initialLayout={{width: responsiveWidth(0.82)}}
      sceneContainerStyle={Style.screenContainerStyle}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.black,
        allowFontScaling: true,
        style: Style.topTabBar,
        tabStyle: Style.tabBarItem,
        labelStyle: Style.tabBarLabel,
        indicatorStyle: Style.indicator,
      }}
      tabBar={props => <TabBarMenu {...props} />}>
      {MENUS_MANAGEMENT_NAVBAR_ITEMS.map((item, index) =>
        renderNavItem(item, index),
      )}
    </TopTabNav.Navigator>
  );
}
export default TabBar;
