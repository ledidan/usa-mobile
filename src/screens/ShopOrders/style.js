import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';

import {paddingHorizontal} from './style';

const Styles = StyleSheet.create({
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
  cancelButton: {
    marginLeft: 15,

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
    marginLeft: -25,
    height: 40,
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
    fontSize: 3,
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

    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  attachButton: {
    marginLeft: 15,
    borderRadius: 10,
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    backgroundColor: '#006AFF',
  },
  file: {
    width: 50,
    height: 40,
    backgroundColor: '#006AFF',
    color: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  brandImage: {
    width: responsiveWidth(8),
    height: responsiveHeight(5),
    borderTopLeftRadius: 10,
    resizeMode: 'contain',
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
  modalContainer: {marginHorizontal: '10%'},
  contentContainer: {
    height: responsiveHeight(70.2),
    overflow: 'scroll',
    maxHeight: '100%',
  },
  closeButton: {
    paddingRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: 7,
    fontSize: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 7,
    fontSize: 3,
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
    width: 250,
    height: 300,
    borderRadius: 10,
    bottom: 80,
    right: 50,
    zIndex: 999,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chatBotMessageBox: {
    maxHeight: 200,
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
    padding: 8,
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

export default Styles;
