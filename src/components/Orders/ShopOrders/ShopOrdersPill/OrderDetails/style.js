import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
import {fontSize, lineHeight} from '../style';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  orderDetailsBox: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: responsiveWidth(1.5),
  },
  active: {
    borderColor: colors.primary,
  },
  confirmed: {
    borderColor: colors.secondary_dark,
  },
  closed: {
    borderColor: '#637381',
  },
  infoRow: {
    display: 'flex',
    maxWidth: responsiveWidth(80),
    flexDirection: 'row',
  },
  infoCol: {marginTop: responsiveHeight(1.5), marginRight: '4%'},
  deliveryAddressCol: {maxWidth: 200, minWidth: 200, borderWidth: 1},
  detailHeading: {
    borderBottomWidth: responsiveHeight(0.2),
    borderBottomColor: '#000',
    marginBottom: responsiveHeight(2),
    // paddingBottom: responsiveHeight(0.2),
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.2),
  },
  textSize: {fontSize, lineHeight},
  textOpacity: {opacity: 0.8},
  textWeight: {fontWeight: 'bold'},
  customerPhoneNumber: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneNumber: {
    color: colors.info,
    fontWeight: 'bold',
  },
  curbsidePickUp: {
    maxWidth: responsiveWidth(35),
    marginTop: 10,
    borderColor: 'black',
  },
  curbsideInfo: {
    backgroundColor: 'white',
    color: 'black',
    height: responsiveHeight(7),
    fontSize: responsiveFontSize(1.2),
  },
  orderItems: {
    marginTop: responsiveHeight(3),
  },
  h3: {
    alignSelf: 'flex-start',
    borderBottomWidth: responsiveHeight(0.2),
    borderColor: '#000',
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1.5),
  },

  subTotal: {
    borderTopWidth: 1.5,
    borderColor: 'black',
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(1.5),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subTotalItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(23),
    marginBottom: 10,
  },
  subTotalText: {
    textAlign: 'right',
    fontSize: responsiveFontSize(1.2),
  },
  label: {color: colors.dark_grey, fontWeight: '700'},
  amount: {fontWeight: 'bold', width: responsiveWidth(6.5)},
});

export default styles;
