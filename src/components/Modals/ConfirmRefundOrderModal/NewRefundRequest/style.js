import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const btn = {
  height: responsiveHeight(6.5),
  alignItems: 'center',
  justifyContent: 'center',
};
const styles = StyleSheet.create({
  itemListContainer: {marginVertical: responsiveHeight(1)},
  checkboxDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: responsiveFontSize(1.2),
    textAlignVertical: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkboxOptionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(1.5),
  },
  cancelButton: {...btn, elevation: 5, marginRight: 10},
  submitButton: {...btn, marginLeft: 10, elevation: 5},
  btnLabel: {
    fontSize: responsiveFontSize(1),
    textAlignVertical: 'center',
    height: '100%',
  },
  refunAmtInput: {
    marginBottom: responsiveHeight(2),
  },
});
export default styles;
