import colors from 'styles/_variables';
import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  backgroundImg: {
    resizeMode: 'contain',
    width,
    position: 'absolute',
    height: responsiveHeight(100),
    top: responsiveHeight(28),
  },
  versionContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  versionText: {
    fontSize: responsiveFontSize(1.1),
    color: "#fff",
  },

  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: responsiveWidth(20),
    marginVertical: responsiveHeight(8),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(2),
    elevation: 10,
    zIndex: 20,
  },
  welcomeLogo: {alignSelf: 'center'},
  searchContainer: {marginVertical: responsiveHeight(2)},
  inputBackgroundColor: {
    backgroundColor: 'white',
  },
  radioBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {fontSize: responsiveFontSize(1), marginLeft: 2, marginRight: 15},
  btnLabel: {
    fontSize: responsiveFontSize(1),
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  accessBtn: {
    backgroundColor: colors.skipli_red_color,
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
