import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
import {paddingHorizontal} from '../style';

const btn = {
  marginLeft: 15,
  height: responsiveHeight(6.5),
  width: responsiveWidth(12),
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 7,
};
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border_color_dark,
    paddingHorizontal,
    paddingVertical: responsiveHeight(1.5),

    //Display
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  cancelButton: {
    ...btn,
    borderColor: colors.border_color_dark,
    borderWidth: 0.6,
  },
  submitButton: {
    ...btn,
  },
  btnLabel: {
    fontSize: responsiveFontSize(1),
    height: responsiveHeight(6.5),
    width: '100%',
    textAlignVertical: 'center',
  },
});
export default styles;
