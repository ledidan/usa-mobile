import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(9),
    paddingHorizontal: 10,
  },
  tab: {
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    height: '100%',
    fontSize: responsiveFontSize(0.9),
    textAlignVertical: 'center',
  },
});

export default styles;
