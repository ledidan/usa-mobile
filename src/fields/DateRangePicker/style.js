import {StyleSheet} from 'react-native';
import {item} from 'components/ShopOrdersToolbar/style';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: colors.border_color_dark,
    borderRadius: item.itemborderRadius,
    borderWidth: item.itemborderWidth,
    paddingVertical: item.itemPaddingVertical,
    paddingHorizontal: item.itemPaddingHorizontal,
    elevation: item.itemElevation,
  },
  calendarIcon: {marginRight: 12},
  input: {fontSize: item.fontSize, fontWeight: '700', padding: 0},
});

export default styles;
