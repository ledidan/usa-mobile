import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';

import {paddingHorizontal} from './style';

const Style = StyleSheet.create({
  footerContainer: {},
  chat_bot_button: {
    position: 'absolute',
    bottom: responsiveHeight(20),
    right: 10,
    zIndex: 999,
    width: responsiveHeight(10),
    height: responsiveHeight(10),
    borderRadius: 25,
    backgroundColor: colors.info,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    marginLeft: 15,
    color: 'white',
    height: responsiveHeight(6.5),
    width: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    borderColor: colors.border_color_dark,
    borderWidth: 0.6,
  },
  submitButton: {
    marginLeft: 15,
    height: responsiveHeight(6.5),
    width: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    backgroundColor: '#006AFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#006AFF',
    padding: 7,

    height: responsiveHeight(8.5),
    borderTopLeftRadius: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  question: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'lightblue',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 7,
    fontSize: responsiveFontSize(1),
    borderRadius: 10,
    flex: 1,
    marginBottom: 10,
  },
  btnLabel: {
    fontSize: responsiveFontSize(1),
    height: responsiveHeight(6.5),
    width: '100%',
    textAlignVertical: 'center',
  },
  header: {
    backgroundColor: '#006AFF',
    padding: 7,
    flexDirection: 'row',
    marginRight: 10,
    height: responsiveHeight(8.5),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  fontText: {
    fontSize: responsiveFontSize(1.4),
  },
  file: {
    width: 50,
    height: 40,
    backgroundColor: '#006AFF',

    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  brandImage: {
    width: responsiveWidth(4),
    height: responsiveHeight(5),
    borderTopLeftRadius: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
  email_input: {
    flex: 1,
    padding: 8,
    borderBottomColor: '#f0f3f4',
    borderBottomWidth: 1,
  },
  text_input: {
    flex: 1,
    padding: 8,
  },
  modalContainer: {marginHorizontal: '15%'},
  contentContainer: {
    paddingBottom: responsiveHeight(50.2),
  },
  closeButton: {
    paddingRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: 7,
    fontSize: responsiveFontSize(0.5),
    borderRadius: 10,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 7,
    fontSize: responsiveFontSize(0.5),
    borderRadius: 10,
    marginBottom: 10,
  },
  modal: {
    width: 250,
    height: 300,
  },
  chatBotContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    width: responsiveWidth(35),
    height: responsiveHeight(80),
    borderRadius: 10,
    bottom: responsiveHeight(15),
    right: 10,
    zIndex: 999,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chatBotMessageBox: {
    maxHeight: 300,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  chatBotInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatBotInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#f0f2f5',
  },
  chatBotInput: {
    flex: 1,
    padding: responsiveHeight(1.5),

    fontSize: responsiveFontSize(1.5),
  },
  sendMessageButton: {
    padding: 8,
  },
  footerContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border_color_dark,
    paddingHorizontal,
    paddingVertical: responsiveHeight(1.5),

    //Display
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Style;
