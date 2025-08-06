import React, { Component } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home, PersonnelLogin ,Tutorial} from "../../screens";
const Stack = createStackNavigator();

export default class Authentication extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PersonnelPin" component={PersonnelLogin} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
      </Stack.Navigator>
    );
  }
}
