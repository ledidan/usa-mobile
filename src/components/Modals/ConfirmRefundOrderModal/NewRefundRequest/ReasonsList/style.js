import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const styles = StyleSheet.create({
  option: {
    marginBottom: responsiveHeight(1),
    width: responsiveWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 35,
    justifyContent: 'space-between',
  },
  radioBtnDescription: {
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: responsiveFontSize(1.2),
    textAlignVertical: 'center',
  },
  input: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(3.5),
  },
});
export default styles;
