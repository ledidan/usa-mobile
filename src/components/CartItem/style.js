import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';

const styles = StyleSheet.create({
  itemInCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  itemName: {
    fontSize: responsiveFontSize(1.2),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(1.8),
  },
  itemExtraInfo: {marginTop: responsiveHeight(1)},
  discount: {fontSize: responsiveFontSize(1.2)},
  modifierContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  itemAddition: {
    color: colors.dark_grey,
    marginRight: 10,
    fontSize: responsiveFontSize(1),
  },
  modifierItem: {fontWeight: '700', fontSize: responsiveFontSize(1)},
  guestNote: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
  mark: {
    backgroundColor: 'yellow',
    fontSize: responsiveFontSize(1.2),
    textAlignVertical: 'center',
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  customerInstruction: {marginTop: 5},
  priceCol: {maxWidth: '20%', width: '20%', alignItems: 'flex-end'},
  price: {fontSize: responsiveFontSize(1.2)},
});

export default styles;
