import {StyleSheet} from 'react-native';
import {item} from 'components/ShopOrdersToolbar/style';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: colors.border_color_dark,
    borderWidth: item.itemborderWidth,
    borderRadius: item.itemborderRadius,
    paddingVertical: item.itemPaddingVertical,
    paddingLeft: item.itemPaddingHorizontal,
    paddingRight: 10,
    elevation: item.itemElevation,
    flexDirection: 'row',
  },
  option: {marginRight: 10},
  optionLabel: {fontSize: item.fontSize, color: 'black', fontWeight: '700'},
  selected: {color: colors.primary, fontWeight: 'bold'},
  selectedOption: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
});
export default styles;
