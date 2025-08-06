import colors from 'styles/_variables';
import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {flex: 1},
  contentContainer: {
    backgroundColor: '#fff',
    width: '35%',
    paddingBottom: '15%',
    flexGrow: 1,
  },
  appVersion: {
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  content: {
    paddingTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backBtnLabel: {
    fontSize: responsiveFontSize(1.2),
    marginLeft: 10,
    fontWeight: '700',
  },
  skipliLogo: {
    marginBottom: responsiveHeight(2.5),
    marginTop: responsiveHeight(3),
  },
  shopContent: {
    marginBottom: responsiveHeight(3.5),
  },
  store: {
    color: colors.dark_grey,
    fontSize: responsiveFontSize(1),
    paddingBottom: responsiveHeight(1.2),
  },
  name: {
    fontWeight: '700',
    fontSize: responsiveFontSize(1.4),
    lineHeight: responsiveFontSize(1.8),
    flex: 1,
  },
  address: {
    fontSize: responsiveFontSize(1.2),
  },
  message: {marginBottom: 10, fontSize: responsiveFontSize(1.4)},
  pinInput: {
    backgroundColor: '#fff',
  },
  errText: {
    fontSize: responsiveFontSize(1),
  },
  submitBtn: {
    backgroundColor: colors.primary,
    marginTop: responsiveHeight(4),
  },
  btnLabel: {color: '#fff', fontSize: responsiveFontSize(1.2), width: '100%'},
  support: {
    borderTopWidth: 1,
    borderColor: colors.border_color_dark,
    marginTop: responsiveHeight(3),
    paddingTop: responsiveHeight(1),
  },
  needHelp: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.6),
  },
  info: {
    color: colors.info,
    fontWeight: '700',
    fontSize: responsiveFontSize(1),
  },
});

export default styles;
