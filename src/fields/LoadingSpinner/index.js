import React, { Component } from "react";

import { Text, View, Animated } from "react-native";
// Style
import Style from "./style";

// Assets
import { SkipliLogoCircleIcon } from "assets/Icons";

export class LoadingSpinner extends Component {
  state = {
    logoAnimation: new Animated.Value(60),
    textAnimation: new Animated.Value(14),
  };
  componentDidMount() {
    this.animateLogo();
  }

  animateLogo = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.textAnimation, {
            toValue: 20,
            duration: this.props.duration,
          }),
          Animated.timing(this.state.textAnimation, {
            toValue: 14,
            duration: this.props.duration,
          }),
        ]),
        Animated.sequence([
          Animated.timing(this.state.logoAnimation, {
            toValue: 100,
            duration: this.props.duration,
          }),
          Animated.timing(this.state.logoAnimation, {
            toValue: 60,
            duration: this.props.duration,
          }),
        ]),
      ]),
      { iterations: 1000 },
    ).start();
  };
  render() {
    const logoAnimation = {
      width: this.state.logoAnimation,
      height: this.state.logoAnimation,
    };
    const textAnimation = {
      fontSize: this.state.textAnimation,
    };
    return (
      <View style={Style.container}>
        <Animated.View style={[logoAnimation]}>
          <SkipliLogoCircleIcon width={"100%"} height={"100%"} />
        </Animated.View>
        <Animated.Text style={[textAnimation, Style.text]}>
          {this.props.message}
        </Animated.Text>
      </View>
    );
  }
}

export default LoadingSpinner;
