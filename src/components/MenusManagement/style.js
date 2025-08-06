import {StyleSheet} from 'react-native';
import colors from 'styles/_variables';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const chipHeight = responsiveHeight(10);
export const addImageIconSize = chipHeight - responsiveHeight(3);
const chipBorderRadius = 7;
const styles = StyleSheet.create({
  chip: {
    height: chipHeight,
  },
  chipHelperButton: {
    height: chipHeight,
    maxWidth: chipHeight,
    minWidth: chipHeight,
  },
  chipName: {
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.4),
    fontSize: responsiveFontSize(0.8),
    lineHeight: responsiveFontSize(1.4),
    overflow: 'hidden',
    maxWidth: '100%',
  },
  avatar: {
    width: chipHeight,
    height: chipHeight,
    borderTopLeftRadius: chipBorderRadius,
    borderBottomLeftRadius: chipBorderRadius,
  },
  pencilIcon: {},
  elementsCounter: {
    backgroundColor: colors.info,
    borderRadius: 10,
    color: '#fff',
    fontSize: responsiveFontSize(0.8),
    paddingVertical: responsiveHeight(0.1),
    paddingHorizontal: responsiveWidth(0.8),
    textTransform: 'uppercase',
  },
  chipContainer: {
    position: 'relative',
  },
  signsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  sign: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    fontSize: responsiveFontSize(0.8),
    marginHorizontal: responsiveWidth(0.5),
    paddingHorizontal: responsiveHeight(1.5),
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
  soldOutSign: {
    backgroundColor: colors.danger,
    color: '#fff',
  },
  onSaleSign: {
    backgroundColor: colors.warning,
    color: '#fff',
  },
  archivedSign: {
    backgroundColor: '#0b2135',
    color: '#fff',
  },
});

export default styles;
