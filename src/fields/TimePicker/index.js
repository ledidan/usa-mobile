import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimePickerModal } from "react-native-paper-dates";
import { TextInput as PaperInput } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";

//field
import Input from "../Input";
const { TextInput } = Input;

// Icons
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";

//lib
import { Functions } from "lib";
import { responsiveWidth } from "react-native-responsive-dimensions";

export class TimePicker extends Component {
  state = {
    open: false,
    hours: 0,
    minutes: 0,
    selectedTime: "",
  };
  onDismiss = () => {
    this.setState({ open: false });
  };
  onOpen = () => {
    this.setState({ open: true });
  };

  onConfirmSingle = ({ hours = 0, minutes = 0 }) => {
    const { DateTime } = Functions;
    minutes = minutes.toString() === "0" ? "00" : minutes.toString();
    const selectedTime = DateTime._convertTime24to12(`${hours}:${minutes}`);
    this.setState({ hours, minutes, selectedTime, open: false }),
      () => this.props.onChange({ hours, minutes, selectedTime });
  };
  renderInput = () => {
    const { onChange, inputStyle, ...rest } = this.props;
    return (
      <TouchableOpacity onPress={this.onOpen} style={{ width: "100%" }}>
        <View pointerEvents="none">
          <TextInput
            mode="outlined"
            label={
              this.state.selectedTime !== "" ? "Chose time" : "Choose a time"
            }
            value={this.state.selectedTime}
            right={
              <PaperInput.Icon
                name={({ color }) => (
                  <MaterialComIcon
                    name="calendar-clock"
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
  render() {
    return (
      <React.Fragment>
        {this.renderInput()}

        <TimePickerModal
          // locale={'en'} optional, default: automatic
          mode={"single"}
          visible={this.state.open}
          onDismiss={this.onDismiss}
          onConfirm={this.onConfirmSingle}
          label="Select time" // optional, default 'Select time'
          cancelLabel="Cancel" // optional, default: 'Cancel'
          confirmLabel="Ok" // optional, default: 'Ok'
          animationType="fade" // optional, default is 'none'
        />
      </React.Fragment>
    );
  }
}

TimePicker.propTypes = {
  onChange: PropTypes.func,
};

TimePicker.defaultProps = {
  onChange: () => {},
};

export default TimePicker;
