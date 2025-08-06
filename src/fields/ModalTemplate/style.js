import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import variables from 'styles/_variables';

const {width, height} = Dimensions.get('window');
export const paddingHorizontal = responsiveWidth(2);
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0.05 * width,
    padding: 0,
    margin: 0,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",     
    alignItems: "center", 
  },
  modalFullScreen: {
    padding: 0,
    margin: 0,
    width,
    height,
  },
  modalContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.5),
    alignSelf: 'center',
  },
  
  modalContainerFullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(1.5),
  },
  contentContainer: {
    paddingBottom: responsiveHeight(5),
    paddingHorizontal,
  },
  disableContent: {
    backgroundColor: variables.grey,
  },
});

export default styles;
