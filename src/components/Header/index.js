import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
// Icons
import MaterialCommIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Style
import colors from "styles/_variables";

const Header = ({ header = "", buttons = [] }) => {
  return (
    <View style={Style.headerContainer}>
      <Text style={Style.header}>{header}</Text>
      {/* ---- Right Side Buttons ---- */}
      {buttons.length > 0 && (
        <View style={Style.buttonGroup}>
          {buttons.map(
            ({
              id,
              label,
              icon,
              onPress,
              disabled,
              buttonStyle = {},
              labelStyle = {},
              iconStyle = {},
            }) => (
              <TouchableOpacity
                key={id}
                disabled={disabled}
                onPress={onPress}
                style={[
                  Style.button,
                  buttonStyle,
                  disabled && Style.disabledButton,
                ]}>
                {icon && (
                  <MaterialCommIcons
                    name={icon}
                    size={responsiveFontSize(1.6)}
                    color="#fff"
                    style={[{ marginRight: 6 }, iconStyle]}
                  />
                )}
                <Text style={[Style.buttonText, labelStyle]}>{label}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    elevation: 4,
  },
  header: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
  },
  disabledButton: {
    opacity: 0.7,
  },
});

Header.propTypes = {
  header: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string, // name of MaterialCommunityIcon
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    }),
  ),
};


export default Header;
