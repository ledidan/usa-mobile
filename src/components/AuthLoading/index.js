import React, {Component} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
//Icon
import {SkipliLogoWithTextIcon} from 'assets/Icons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import colors from 'styles/_variables';
export default class AuthLoading extends Component {
  render() {``
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignSelf: 'center', marginBottom: 20}}>
          <SkipliLogoWithTextIcon
            width={responsiveWidth(20)}
            height={responsiveHeight(8)}
          />
        </View>
        <ActivityIndicator size={colors.isSmallScreen ? 'small' : 'large'} />
      </View>
    );
  }
}
