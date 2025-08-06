import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Title } from "react-native-paper";

import Style from "./style";

const DeliveryAddress = ({ deliveryDetails }) => {
  const { deliveryAddress } = deliveryDetails;
  const { streetAddress1, streetAddress2, city, state, zip } = deliveryAddress;
  return (
    <View style={[Style.infoCol, Style.deliveryAddressCol]}>
      <View style={Style.detailHeading}>
        <Title style={Style.heading}>delivery address</Title>
      </View>
      <Text style={Style.textSize}>{streetAddress1}</Text>
      {!!streetAddress2 && <Text style={Style.textSize}>{streetAddress2}</Text>}
      <Text style={Style.textSize}>
        {city}, {state}
      </Text>
      {!!zip && <Text style={Style.textSize}>{zip}</Text>}
    </View>
  );
};

DeliveryAddress.propTypes = {
  deliveryDetails: PropTypes.shape({
    deliveryAddress: PropTypes.shape({
      streetAddress1: PropTypes.string,
      streetAddress2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
    }),
  }),
};

export default DeliveryAddress;
