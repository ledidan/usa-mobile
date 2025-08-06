import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const common = {
  borderRadius: 100,
  color: '#fff',
  paddingVertical: responsiveHeight(1),
  paddingHorizontal: responsiveWidth(1.5),
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  paidOrderMessage: {
    ...common,
    backgroundColor: '#4969f5',
    marginRight: 15,
    marginBottom: 10,
    fontSize: responsiveFontSize(1),
  },
  text: {
    color: '#fff',
    fontSize: responsiveFontSize(1),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  refundRequests: {
    ...common,
    backgroundColor: colors.dark_grey,
    flexDirection: 'row',
    marginBottom: 10,
    width: responsiveWidth(17),
    justifyContent: 'space-between',
  },
  requestCount: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: responsiveWidth(2),
    borderRadius: 100,
  },
  count: {color: '#000', fontSize: responsiveFontSize(1)},
});
export default styles;
