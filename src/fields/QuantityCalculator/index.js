import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

//Style
import Style from "./style";

function QuantityCalculator(props) {
  const { incrementAmount } = props;
  const increment = isNaN(incrementAmount) ? 1 : parseFloat(incrementAmount);
  return (
    <View>
      <Button
        icon="minus"
        style={[
          Style.iconContainer,
          props.disableMinusButton && Style.disabled,
          props.minusButtonStyle,
        ]}
        onPress={() => props.onButtonClick(-increment)}
      />
      <Text style={[Style.quantityNumber, props.quantityNumberStyle]}>
        {props.currentQuantity}
      </Text>
      <Button
        icon="plus"
        style={[
          Style.iconContainer,
          props.disablePlusButton && Style.disabled,
          props.plusButtonStyle,
        ]}
        onPress={() => props.onButtonClick(increment)}
      />
    </View>
  );
}

QuantityCalculator.propTypes = {
  className: PropTypes.any,
  currentQuantity: PropTypes.any,
  disableMinusButton: PropTypes.bool,
  disablePlusButton: PropTypes.bool,
  incrementAmount: PropTypes.number,
  onButtonClick: PropTypes.func.isRequired,
};

QuantityCalculator.defaultProps = {
  currentQuantity: 0,
  disableMinusButton: false,
  disablePlusButton: false,
  incrementAmount: 1,
};

export default QuantityCalculator;
