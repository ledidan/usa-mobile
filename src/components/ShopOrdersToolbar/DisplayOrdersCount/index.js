import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import Style from "./style";

// Fields
import { QuantityCalculator } from "fields";

const DisplayOrdersCount = props => {
  const onChangeNumOrdersPerRow = increament => {
    const { numOrdersPerRow = 1 } = props;
    props.onChangeNumOrdersPerRow(
      parseInt(numOrdersPerRow) + parseInt(increament),
    );
  };
  return (
    <View>
      <QuantityCalculator
        style={Style.quantityCalculator}
        currentQuantity={props.numOrdersPerRow}
        quantityNumberClassName={Style.quantityNumber}
        minusButtonStyle={Style.minusButton}
        onButtonClick={onChangeNumOrdersPerRow}
        plusButtonStyle={Style.plusButton}
      />
      <Text style={{ marginLeft: 10 }}>Orders/Row</Text>
    </View>
  );
};
DisplayOrdersCount.propTypes = {
  numOrdersPerRow: PropTypes.number.isRequired,
  onChangeNumOrdersPerRow: PropTypes.func.isRequired,
};

export default DisplayOrdersCount;
