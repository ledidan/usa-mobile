import {StyleSheet} from 'react-native';
import colors from 'styles/_variables';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const chipBorderRadius = 7;
const chipHeight = responsiveHeight(10);
const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#fff',
    borderRadius: chipBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    height: chipHeight,
    position: 'relative',
    maxWidth: responsiveWidth(90),
    marginHorizontal: responsiveWidth(0.4),
    elevation: 3,
  },
  avatar: {
    borderTopLeftRadius: chipBorderRadius,
    borderBottomLeftRadius: chipBorderRadius,
    height: chipHeight,
    width: chipHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingRight: responsiveWidth(1.5),
    paddingLeft: responsiveWidth(1),
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  helperButton: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: chipBorderRadius,
    borderBottomRightRadius: chipBorderRadius,
    borderLeftWidth: responsiveWidth(0.3),
    borderLeftColor: colors.grey,
    height: '100%',
    maxWidth: chipHeight,
    minWidth: chipHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
export default styles;
