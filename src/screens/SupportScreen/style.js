import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const {width} = Dimensions.get('window');
const btn = {
  height: responsiveHeight(6.5),
  justifyContent: 'center',
  alignItems: 'center',
};
const styles = StyleSheet.create({
  suportContainer: {
    width: responsiveWidth(82),
    maxWidth: responsiveWidth(82),
  },
  requestItemContainer: {
    width: responsiveWidth(34),
    marginBottom: '3%',
    marginLeft: '5%',
  },
  requestCardItem: {
    width: responsiveWidth(30),
    marginVertical: 15,
    marginHorizontal: 15,
  },
  requestCardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  requestItemImg: { width: responsiveWidth(4), height: responsiveWidth(4) },
  requestItemContent: {
    width: '60%',
  },
  requestItemTitle: {
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  requestItemDesc: {
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveFontSize(1.4),
  },
  btnLabel: {
    fontSize: responsiveFontSize(1.2),
    height: '100%',
    textAlignVertical: 'center',
  },
  issueTitle: {
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveFontSize(2),
  },
  textInput: {
    marginTop: responsiveHeight(0.7),
    fontSize: responsiveFontSize(1.3),
    justifyContent: 'center',
  },
  descBox: {
    marginTop: responsiveHeight(2),
  },
  issueButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(4),
    width: '100%',
  },
  backBtn: {
    alignSelf: "flex-start",
    marginLeft: "3%",
    marginTop: "1%",
    backgroundColor: "#E6F0FF",
  },
  thankScreenContainer: {
    width: responsiveWidth(82),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(2.5),
  },
  thankScreenContent: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    width: responsiveWidth(45),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  thankImage: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    marginBottom: responsiveHeight(2),
  },
  thankBtn: {...btn, marginTop: responsiveHeight(2)},
  thankHeadline: {
    fontSize: responsiveFontSize(1.7),
    lineHeight: responsiveFontSize(2),
  },
  thankTitle: {
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(1.6),
  },
  requestIDText: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.4),
    marginVertical: responsiveHeight(1.2),
  },
  pageContainer: {
    flexDirection: "column",
    width: responsiveWidth(80),
    maxWidth: responsiveWidth(90),
  },
});

export default styles;
