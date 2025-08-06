import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7fafc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border_color_dark,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: -responsiveWidth(2),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: 20,
  },
  notice: {
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveFontSize(1.8),
  },
});
export default styles;
