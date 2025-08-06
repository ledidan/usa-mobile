import React from "react";

import { InfoIcon } from "assets/Icons";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Style from "./style";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
class Notice extends React.Component {
  state = { showMore: false };
  renderContent = () => (
    <View style={Style.content}>
      <Text style={Style.contentText}>
        Your data security is our top priority. We only show shops that closely
        match with your shop's name. Please see example below to quickly find
        your shop.
      </Text>
      <View style={Style.example}>
        <View>
          <Text style={Style.exampleTextLabel}>Shop Name</Text>
          <Text style={Style.searchText}>My Awesome Restaurant</Text>
        </View>
        {/* <View style={{ marginVertical: 10 }}>
          <Icon name="arrow-forward" size={30} />
        </View> */}
        <View>
          <Text style={Style.exampleTextLabel}>Recommend Search Text</Text>
          <Text style={Style.searchText}>My Awesome Restaurant</Text>
        </View>
      </View>
    </View>
  );

  render() {
    const { showMore } = this.state;
    return (
      <View style={Style.container}>
        <TouchableRipple onPress={() => this.setState({ showMore: !showMore })}>
          <View style={[Style.notice, showMore && Style.expanded]}>
            <View style={Style.title}>
              <InfoIcon
                width={responsiveWidth(2.5)}
                height={responsiveHeight(2.5)}
                style={{ marginRight: responsiveWidth(1.2) }}
                fill="#fff"
              />
              <Text style={Style.titleText}>Search text is case sensitive</Text>
            </View>
            <View style={Style.learnMore}>
              <Text style={Style.titleText}>
                {showMore ? "Hide Tip" : "Show Tip"}
              </Text>
            </View>
          </View>
        </TouchableRipple>
        {showMore && this.renderContent()}
      </View>
    );
  }
}

export default Notice;
