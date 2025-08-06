import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
//Style
import Style from "./style";

//Icon
import { OrderFoodOnlineIcon } from "assets/Icons";

export default function Header(props) {
  const { shopID, scene } = props;
  const { descriptor } = scene;
  const { navigation } = descriptor;
  const onViewLiveMenu = () => {
    Linking.openURL(`https://www.skiplinow.com/shop/${shopID}`);
  };
  return (
    <View style={Style.headerContainer}>
      {/* <TouchableOpacity style={Style.btn} onPress={onViewLiveMenu}>
        <OrderFoodOnlineIcon width={30} height={30} fill="white" />
        <Text style={Style.btnLabel}>View Live Menu</Text>
      </TouchableOpacity> */}
    </View>
  );
}
