import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePickerModal } from "react-native-paper-dates";
import { TextInput as PaperInput } from "react-native-paper";
import { Text, View, TouchableOpacity } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import {
  _convertDateObjectToString,
  _convertGMTStringtoDateObject,
} from "./HelperFunctions";

// Style
import Style from "./style";
import colors from "styles/_variables";

//field
import Input from "../Input";
const { TextInput } = Input;

// Icons
import { CalendarIcon } from "assets/Icons";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";

export class DateRangePicker extends Component {
  state = {
    open: false,
    selectedRange: { startDate: undefined, endDate: undefined },
    selectedDate: "",
  };
  onDismiss = () => {
    this.setState({ open: false });
  };
  onOpen = () => {
    this.setState({ open: true });
  };
  onConfirm = selectedRange => {
    const { startDate = "", endDate = "", dates = "" } = selectedRange;
    const selectedUTCDayRange = { from_utc: startDate, to_utc: endDate };
    const selectedDayRange = {
      from: _convertGMTStringtoDateObject(startDate.toString()),
      to: _convertGMTStringtoDateObject(endDate.toString()),
    };
    this.setState({ open: false, selectedRange }, () =>
      this.props.onChange({ selectedDayRange, selectedUTCDayRange }),
    );
  };
  onConfirmSingle = ({ date = "" }) => {
    const dateObject = _convertGMTStringtoDateObject(date.toString());
    const selectedDate = _convertDateObjectToString(dateObject);
    this.setState({ selectedDate, open: false }),
      () => this.props.onChangeSingle({ selectedDate, selectedUTCDate: date });
  };
  renderInput = rest => {
    const {
      inputStyle = {},
      selectedDayRange,
      mode = "range",
      isSelected,
    } = this.props;
    const { from, to } = selectedDayRange;
    if (mode === "range")
      return (
        <TouchableOpacity style={Style.container} onPress={this.onOpen}>
          <View style={Style.calendarIcon}>
            <CalendarIcon
              width={responsiveWidth(2.5)}
              height={responsiveHeight(2.5)}
              fill={isSelected ? colors.primary : "black"}
            />
          </View>
          <Text
            style={[
              Style.input,
              (from || to) && Style.fullWidth,
              inputStyle,
              isSelected && {
                color: colors.primary,
              },
            ]}>
            {this.renderInputValue()}
          </Text>
        </TouchableOpacity>
      );
    else if (mode === "single")
      return (
        <TouchableOpacity onPress={this.onOpen} style={{ width: "100%" }}>
          <View pointerEvents="none">
            <TextInput
              mode="outlined"
              label={
                this.state.selectedDate !== "" ? "Chose date" : "Choose a date"
              }
              value={this.state.selectedDate}
              right={
                <PaperInput.Icon
                  name={({ color }) => (
                    <MaterialComIcon
                      name="calendar"
                      color={color}
                      size={this.props.rightIconSize || responsiveWidth(2.5)}
                    />
                  )}
                  onPress={this.onOpen}
                />
              }
              containerStyle={inputStyle}
              {...rest}
            />
          </View>
        </TouchableOpacity>
      );
  };
  renderInputValue = () => {
    const { selectedDayRange = {} } = this.props;
    const { from, to } = selectedDayRange;
    if (!from && !to) return "From - To";
    const fromString = _convertDateObjectToString(from);
    const toString = _convertDateObjectToString(to);
    if (from && !to) return `${fromString} - To`;
    else if (!from && to) return `From - ${toString}`;
    return `${fromString} - ${toString}`;
  };
  render() {
    const { selectedRange } = this.state;
    const {
      mode = "range",
      allowSelectPassedDate = false,
      onChange,
      onChangeSingle,
      selectedDate,
      selectedDayRange,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {this.renderInput({ ...rest })}
        {mode === "range" ? (
          <DatePickerModal
            // locale={'en'} optional, default: automatic
            mode={"range"}
            visible={this.state.open}
            onDismiss={this.onDismiss}
            startDate={selectedRange.startDate}
            endDate={selectedRange.endDate}
            onConfirm={this.onConfirm}
            saveLabel="Select" // optional
            label="Select period" // optional
            startLabel="From" // optional
            endLabel="To" // optional
            animationType="slide" // optional, default is slide on ios/android and none on web
          />
        ) : (
          <DatePickerModal
            // locale={'en'} optional, default: automatic
            mode={"single"}
            visible={this.state.open}
            onDismiss={this.onDismiss}
            onConfirm={this.onConfirmSingle}
            validRange={{
              startDate: allowSelectPassedDate ? null : new Date(),
            }}
            saveLabel="Select" // optional
            label="Choose a date" // optional
            animationType="slide" // optional, default is slide on ios/android and none on web
          />
        )}
      </React.Fragment>
    );
  }
}

DateRangePicker.propTypes = {
  onChange: PropTypes.func,
  onChangeSingle: PropTypes.func,
  selectedDate: PropTypes.string,
  selectedDayRange: PropTypes.exact({
    from: PropTypes.exact({
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number,
    }),
    to: PropTypes.exact({
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number,
    }),
  }),
  isSelected: PropTypes.bool,
};

DateRangePicker.defaultProps = {
  mode: "range",
  onChange: () => {},
  onChangeSingle: () => {},
  selectedDayRange: { from: null, to: null },
  selectedDate: "",
  isSelected: false,
};

export default DateRangePicker;
