import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";

import Style from "./style";

// Lib
import { Constants, Services } from "lib";

const { TIME_RANGE_OPTIONS } = Constants;

export class TimeRangePicker extends Component {
  componentDidMount = () => this.onGetTimeRange(this.props.selectedTimeRangeID);

  componentDidUpdate = prevProps => {
    const { selectedTimeRangeID } = this.props;
    if (prevProps.selectedTimeRangeID !== selectedTimeRangeID) {
      this.onGetTimeRange(selectedTimeRangeID);
    }
  };

  onGetTimeRange = async selectedTimeRangeID => {
    if (!selectedTimeRangeID) return;
    const { BUTI } = Services;
    const { GetTimeRange } = BUTI.GetRequests;
    const { endAt = "", startAt = "" } = await GetTimeRange({
      timeRange: selectedTimeRangeID,
      timeZone: this.props.timeZone,
    });
    this.props.onChange({ endAt, selectedTimeRangeID, startAt });
  };

  renderOptions = () =>
    Object.entries(TIME_RANGE_OPTIONS).map(entry => {
      const { label } = entry[1];
      const isSelected = entry[0] === this.props.selectedTimeRangeID;
      return (
        <TouchableOpacity
          style={[Style.option, isSelected && Style.selectedOption]}
          key={entry[0]}
          onPress={() => this.onGetTimeRange(entry[0])}>
          <Text style={[Style.optionLabel, isSelected && Style.selected]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    });
  render() {
    return <View style={Style.container}>{this.renderOptions()}</View>;
  }
}

TimeRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedTimeRangeID: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
};

export default TimeRangePicker;
