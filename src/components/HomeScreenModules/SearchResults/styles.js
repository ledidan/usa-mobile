import colors from 'styles/_variables';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
  },
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputFieldContainer: {width: '85%'},
  radioBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtnLabel: {
    fontSize: responsiveFontSize(1),
    marginLeft: 2,
    marginRight: 15,
  },
  glassIcon: {
    backgroundColor: colors.skipli_red_color,
    width: responsiveWidth(6),
    height: responsiveHeight(10.5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4dae0',
    backgroundColor: '#f7fafc',
    marginVertical: responsiveHeight(1),
  },
  tooManyResults: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
  },
  shop: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.primary_light,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(1),
    marginTop: responsiveHeight(1),
  },
  shopInfo: { paddingRight: 20, alignContent: "flex-start", maxWidth: "85%" },
  name: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  address: {
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveFontSize(1.6),
    marginTop: 6,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  selectIcon: {marginLeft: 10},
  needHelp: {
    borderTopColor: colors.border_color_dark,
    borderTopWidth: 1,
    marginTop: responsiveHeight(3),
  },
  needHelpText: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(1.2),
    color: colors.dark_grey,
  },
  skipliContact: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contactBtnText: {
    fontSize: responsiveFontSize(1),
    marginRight: 25,
    marginLeft: 10,
    color: colors.info,
    fontWeight: '700',
  },
});

export default styles;
