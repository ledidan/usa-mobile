import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import styleVar from 'styles/_variables';
const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    marginVertical: responsiveHeight(2),
  },
  elementContainer: {
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
    width: styleVar.isSmallScreen ? '100%' : '47%',
  },
  emptyListMessage: {
    fontSize: responsiveFontSize(1.4),
  },
});

export default styles;
