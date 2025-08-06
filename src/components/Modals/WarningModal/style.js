import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  modalContainer: {
    marginHorizontal: '20%',
    borderWidth: responsiveWidth(0.5),
    height: "75%",
    borderColor: colors.warning,
  },
  descText: {fontSize: responsiveFontSize(1)},
  contentDescriptionContainer: {
    backgroundColor: colors.warning,
    marginTop: -responsiveHeight(1.5),
    borderWidth: 0,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: responsiveHeight(20),
  },
  message: {
    color: colors.warning,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.4),
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: responsiveHeight(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  btn: {
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
  },
  btnLabel: {
    height: '100%',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(1),
  },
});
export default styles;
