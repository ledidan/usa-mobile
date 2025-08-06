import colors from 'styles/_variables';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
const style = StyleSheet.create({
  container: {marginBottom: responsiveHeight(2)},
  notice: {
    backgroundColor: '#4969f5',
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: 16,
    //display
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {flexDirection: 'row', alignItems: 'center'},
  titleText: {fontSize: responsiveFontSize(1), color: '#fff'},
  learnMore: {borderBottomColor: '#fff', borderBottomWidth: 1},
  content: {
    borderColor: '#4969f5',
    borderTopWidth: 0,
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  contentText: {
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveFontSize(1.6),
  },
  example: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exampleTextLabel: {
    fontSize: responsiveFontSize(1.2),
  },
  searchText: {
    backgroundColor: colors.border_color_dark,
    borderRadius: 6,
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
});
export default style;
