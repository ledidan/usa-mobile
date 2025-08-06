import {StyleSheet} from 'react-native';
import color from 'styles/_variables';
const btn = {paddingVertical: 5, paddingHorizontal: 20};
const styles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: color.border_color_dark,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  refundRequests: {
    backgroundColor: '#f7fafc',
    borderBottomWidth: 1,
    borderBottomColor: color.border_color_dark,
    marginTop: 0,
    marginHorizontal: -20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  requestId: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#697386',
    textTransform: 'capitalize',
    width: 70,
    fontSize: 14,
    lineHeight: 23,
  },
  desc: {fontSize: 14, lineHeight: 23},
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    justifyContent: 'center',
  },

  cancelButton: {...btn, elevation: 5, marginRight: 10},
  submitButton: {...btn, marginLeft: 10, elevation: 5},
});
export default styles;
