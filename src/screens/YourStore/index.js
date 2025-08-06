import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, Alert, View } from "react-native";
// Components
import { Header, InfoCard } from "components";
import InfoInputRow from "components/InfoCard/InfoInputRow";
// Helpers
import { _formatPhoneNumber } from "utils";
import { YOUR_STORE_SECTIONS } from "./HelperFunctions";
//Lib
import { Functions } from "lib";
// Destructure
const { LocalStorage } = Functions;
import colors from "styles/_variables";

export class YourStore extends Component {
  state = {
    isLoading: false,
  };

  _getBasicInfoFieldsMap = () => {
    const shopBasicInfoSettings = YOUR_STORE_SECTIONS["basicInfo"];
    const { fields = [] } = shopBasicInfoSettings;

    return fields.reduce((acc, field) => {
      const { id = "" } = field;
      const fieldData = String(this.props.shopBasicInfo[id] || "");
      switch (id) {
        case "salesTax":
          const val = parseFloat(`${fieldData}e2`);
          acc[id] = isNaN(val) ? 0 : String(val);
          break;
        case "phoneNumber":
          const phoneVal = fieldData.replace(/[^0-9]/g, "");
          acc[id] =
            phoneVal.length >= 10 ? _formatPhoneNumber(phoneVal) : phoneVal;
          break;
        default:
          acc[id] = fieldData;
      }
      return acc;
    }, {});
  };

  rendernewOrdersNotification = () => {
    const { phoneNumbersToReceiveOrders = {} } = this.props.shopBasicInfo || {};
    const validPhoneNumbers = Object.values(phoneNumbersToReceiveOrders).filter(
      value => value,
    );

    if (!validPhoneNumbers.length) {
      return <Text>No phone numbers registered.</Text>;
    }

    return validPhoneNumbers.map((phoneNumber, index) => {
      return (
        <InfoInputRow
          key={index}
          label={`Mobile Number #${index + 1}`}
          value={_formatPhoneNumber(phoneNumber)}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={{ width: "100%", flex: 1 }} stickyHeaderIndices={[0]}>
        <Header
          header="Your Store"
          buttons={[
            {
              id: "refresh",
              label: "Refresh",
              icon: "refresh",
              onPress: async () => {
                this.setState({ isLoading: true });
                const shopID = await LocalStorage.getItemFromStorage("shopID");
                if (!shopID) {
                  Alert.alert("Error", "Shop ID not found", [
                    { text: "OK", style: "cancel" },
                  ]);
                  this.setState({ isLoading: false });
                  return;
                }
                await this.props.onRefreshShopBasicInfo(shopID);
                this.setState({ isLoading: false });
              },
              disabled: this.state.isLoading,
              buttonStyle: {
                backgroundColor: "#fff",
                borderColor: colors.border_color_dark,
                borderWidth: 1,
                borderRadius: 10,
                elevation: 2,
                color: "#006AFF",
              },
              iconStyle: {
                color: "#006AFF",
              },
              labelStyle: {
                color: "#006AFF",
              },
            },
          ]}
        />
        <View style={Style.scrollContainer}>
          <InfoCard
            cardConfig={YOUR_STORE_SECTIONS["basicInfo"]}
            fieldsValueMap={this._getBasicInfoFieldsMap()}
          />
          <InfoCard
            cardConfig={YOUR_STORE_SECTIONS["newOrdersNotification"]}
            useCustomContent={true}>
            {this.rendernewOrdersNotification()}
          </InfoCard>
        </View>
      </ScrollView>
    );
  }
}

const Style = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
});

export default YourStore;
