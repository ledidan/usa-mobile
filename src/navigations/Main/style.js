import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  drawerStyle: {
    width: responsiveWidth(18),
    borderRightWidth: responsiveWidth(0.1),
    borderRightColor: colors.border_color,
  },
  sidebarContainer: {
    flex: 1, 
    maxWidth: '20%', 
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 4, 
  },
});

export default style;
