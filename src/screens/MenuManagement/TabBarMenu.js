import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Style from "./style";

//TODO: add PAGER animation
const TabBarMenu = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={Style.topTabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[Style.tabBarItem, isFocused && Style.indicator]}>
            <Text style={[Style.tabBarLabel, isFocused && Style.focusedLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarMenu;
