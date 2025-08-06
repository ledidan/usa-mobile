import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
import {paddingHorizontal} from '../style';
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomColor: colors.border_color_dark,
    borderBottomWidth: 1,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal,
  },
  header: {
    fontSize: responsiveFontSize(1.8),
    paddingTop: responsiveHeight(2),
    fontWeight: 'bold',
  },
  closeIcon: {
    alignSelf: 'flex-start',
    elevation: 5,
    borderRadius: 8,
  },
});

export default styles;
