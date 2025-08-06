import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { Header, InfoCard } from "components";
import codePush from "react-native-code-push";
import Constants from "lib/Constants";
import { Functions } from "lib";

const { APP_DETAILS_INFO } = Constants;

export class AppInfo extends Component {
  state = {
    currentStatus: null,
  };

  render() {
    const appDetailsFields = APP_DETAILS_INFO({
      check_nextpush_update: this.props.handleCheckUpdateNextpush,
    });

    const fieldsValueMap = appDetailsFields.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr.value }),
      {},
    );

    const APP_INFO_CARDS = {
      title: "App Details",
      subtitle: "Basic information about this app",
      fields: appDetailsFields,
    };

    return (
      <ScrollView style={{ width: "100%", flex: 1 }} stickyHeaderIndices={[0]}>
        <Header header="App Info" />
        <View style={Style.scrollContainer}>
          <InfoCard
            cardConfig={APP_INFO_CARDS}
            fieldsValueMap={fieldsValueMap}
          />
        </View>
      </ScrollView>
    );
  }
}

const Style = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
});

export default AppInfo;
