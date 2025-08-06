import {StyleSheet} from 'react-native';
import colors from 'styles/_variables';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const itemBorderWidth = 1;
const itemBorderRadius = 10;
const itemPaddingVertical = responsiveHeight(1.2);
const itemElevation = 2;
const styles = StyleSheet.create({
  container: {flex: 1},
  headingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  heading: {
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(2),
  },

  elementContainer: {
    marginRight: responsiveHeight(2),
    marginBottom: responsiveHeight(0.5),
    marginLeft: 10,
  },
  expandRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: colors.border_color_dark,
    borderWidth: itemBorderWidth,
    borderRadius: itemBorderRadius,
    elevation: itemElevation,
    color: colors.text_color,
    paddingVertical: itemPaddingVertical,
    paddingHorizontal: responsiveWidth(1.6),
    textAlign: 'center',
  },

  btnLabel: {
    fontSize: responsiveFontSize(1),
    fontWeight: '700',
    color: colors.primary,
  },
  btnIcon: {
    marginRight: 5,
    color: colors.primary,
  },
});
export default styles;
