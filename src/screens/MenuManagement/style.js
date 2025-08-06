import {StyleSheet} from 'react-native';
import colors from 'styles/_variables';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const styles = StyleSheet.create({
  screenContainerStyle: {
    padding: responsiveWidth(2),
  },
  topTabBar: {
    width: responsiveWidth(82),
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 5,
  },
  tabBarItem: {
    paddingHorizontal: responsiveWidth(2),
    height: responsiveHeight(7),
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: responsiveFontSize(1),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    margin: 0,
    color: '#000',
    paddingBottom: responsiveHeight(0.5),
  },
  focusedLabel: {
    color: colors.primary,
    fontSize: responsiveFontSize(1.2),
  },
  indicator: {
    borderBottomColor: colors.primary,
    borderBottomWidth: responsiveHeight(0.4),
  },
});
export default styles;
