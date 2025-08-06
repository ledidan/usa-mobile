import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import color from 'styles/_variables';

export const change_order_status_button_height = 15;
export const fontSize = responsiveFontSize(1.2);
export const lineHeight = responsiveFontSize(1.8);
export const textColor = '#fff';

const style = StyleSheet.create({
  orderContainer: {
    marginBottom: responsiveHeight(2),
  },
  orderPreviewBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: color.global_border_radius,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(1.5),
    flexWrap: 'wrap',
  },
  active: {backgroundColor: color.primary},
  confirmed: {backgroundColor: color.secondary_dark},
  closed: {backgroundColor: '#637381'},
  showExpandedInfo: {borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
  isLoading: {opacity: 0.8},
});

export default style;
