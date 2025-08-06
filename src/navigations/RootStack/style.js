import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import colors from 'styles/_variables';

const toastContainer = {
  width: '60%',
  height: responsiveHeight(12),
  elevation: 15,
};
const style = StyleSheet.create({
  contentContainner: {
    paddingLeft: responsiveWidth(2.5),
    margin: 0,
  },
  error: {
    ...toastContainer,
    backgroundColor: '#ad2626',
    borderColor: '#ad2626',
  },
  success: {
    ...toastContainer,
    backgroundColor: '#0eab6b',
    borderColor: '#0eab6b',
  },
  info: {
    ...toastContainer,
    backgroundColor: colors.info,
    borderColor: colors.info,
  },
  warning: {
    ...toastContainer,
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  title: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  message: {
    color: 'white',
    fontSize: responsiveFontSize(1.4),
    fontWeight: 'bold',
  },
  leadingIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    marginLeft: responsiveWidth(2),
  },
  tralingIcon: {
    height: responsiveWidth(2),
    width: responsiveWidth(2.5),
    marginRight: responsiveWidth(1.5),
    marginBottom: responsiveHeight(5),
  },
  disable: {display: 'none'},
});
export default style;
