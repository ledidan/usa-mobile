import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";
import InfoInputRow from "./InfoInputRow";
import { Button } from "react-native-paper";
import { responsiveWidth } from "react-native-responsive-dimensions";

class InfoCard extends Component {
  renderField = (field, value, id) => {
    const { label = "", button } = field;
  
    const screenWidth = Dimensions.get("window").width;
    const getInputWidth = () => {
      if (screenWidth >= 1200) return responsiveWidth(24.5); 
      if (screenWidth >= 1072) return responsiveWidth(22.2);
      return responsiveWidth(19);
    };
    const inputWidth = button ? { width: getInputWidth() } : {};

    return (
      <React.Fragment key={id}>
        <InfoInputRow label={label} value={value} style={inputWidth} />
        {button && (
          <TouchableOpacity
            onPress={button.action}
            style={{
              borderWidth: 1,
              borderColor: "#006AFF",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
              height: 43,
              marginTop: 25,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ color: "#006AFF", fontWeight: "600" }}>
              {button.label || "Button"}
            </Text>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  };

  renderFields = (fields = []) => {
    const { fieldsValueMap } = this.props;
    return fields.map(field => {
      const { id = "" } = field;
      return this.renderField(field, String(fieldsValueMap[id] || ""), id);
    });
  };

  render() {
    const { cardConfig, titleStyle = "" } = this.props;
    const { title = "", subtitle = "", fields = [] } = cardConfig;

    return (
      <View style={Style.card}>
        <View style={Style.cardHeader}>
          <Text style={[Style.title, titleStyle]}>{title}</Text>
          {subtitle ? <Text style={Style.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={Style.cardContent}>
          {this.props.useCustomContent
            ? this.props.children
            : this.renderFields(fields)}
        </View>
      </View>
    );
  }
}

InfoCard.propTypes = {
  cardConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    fields: PropTypes.array,
  }).isRequired,
  fieldsValueMap: PropTypes.object,
  useCustomContent: PropTypes.bool,
};

InfoCard.defaultProps = {
  cardConfig: {},
  fieldsValueMap: {},
  useCustomContent: false,
};

const Style = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    borderBottomColor: "#eaeaea",
    borderBottomWidth: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    fontSize: 15,
  },
  cardContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
});

export default InfoCard;
