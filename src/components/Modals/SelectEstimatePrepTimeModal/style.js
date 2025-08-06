import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';

const styles = StyleSheet.create({
  orderInfo: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveHeight(1.5),
    marginBottom: responsiveHeight(2),
  },
  pickUpTime: {marginVertical: 5, marginRight: 15},
  pickUpTimeText: {
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(1),
  },
  pickUpBy: {marginVertical: 5, flexDirection: 'row'},
  pickUpByText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: responsiveFontSize(1),
  },
  courier: {marginLeft: 10},
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.5),
    alignItems: 'center',
  },
  submitButton: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(35),
    height: responsiveHeight(6.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnLabel: {
    fontSize: responsiveFontSize(1),
    height: responsiveHeight(6.5),
    width: '100%',
    textAlignVertical: 'center',
  },
});

export default styles;
