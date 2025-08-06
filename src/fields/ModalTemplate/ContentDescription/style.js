import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import variable from 'styles/_variables';
import {paddingHorizontal} from '../style';
const styles = StyleSheet.create({
  contentDescriptionContainer: {
    backgroundColor: '#f7fafc',
    borderBottomColor: variable.border_color_dark,
    borderBottomWidth: 1,
    paddingHorizontal,
    paddingVertical: responsiveHeight(1),
    marginBottom: responsiveScreenWidth(2.5),
  },
  title: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: responsiveHeight(1),
  },
  contentDescription: {margin: 0, fontSize: responsiveScreenFontSize(1)},
});

export default styles;
