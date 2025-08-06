import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 440,
  },
  bagIcon: {marginBottom: responsiveHeight(1.5)},
  title: {
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(3.6),
  },
  message: {
    fontSize: responsiveFontSize(1.4),
    marginTop: responsiveHeight(0.8),
    marginBottom: responsiveHeight(4),
  },
  viewPastOrdersButton: {
    height: responsiveHeight(6.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chat_bot_button: {
    position: 'absolute',
    bottom: 110,
    right: 50,
    zIndex: 999,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.info,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnLabel: {
    fontSize: responsiveFontSize(1.2),
    height: '100%',
    textAlignVertical: 'center',
  },
});

export default styles;
