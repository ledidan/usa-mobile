import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const {width} = Dimensions.get('window');

const btn = {
  alignItems: 'center',
  justifyContent: 'center',
};
const btnLabel = {
  height: '100%',
  textAlignVertical: 'center',
  fontSize: responsiveFontSize(1.2),
};
const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'column',
    width: responsiveWidth(82),
    maxWidth: responsiveWidth(82),
  },
  tutorialCard: {
    width: responsiveWidth(30),
    marginVertical: 15,
    marginHorizontal: 15,
  },
  tutorialCardContent: {
    paddingTop: responsiveHeight(2),
  },
  topicTitle: {
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveFontSize(1.8),
  },
  topicCaption: {
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveFontSize(1.4),
  },
  btnLabel: { ...btnLabel },
  backBtn: {
    alignSelf: 'flex-start',
    marginLeft: '3%',
    marginTop: '1%',
    backgroundColor: "#E6F0FF",
    ...btn,
  },

  videoChip: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: '2%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5),
  },
  videoCardContainer: {
    marginBottom: '3%',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1),
  },
  oneVideo: {
    width: 0.6 * width,
    marginHorizontal: '14%',
  },
  multVideos: {width: responsiveWidth(35), marginLeft: '5%'},
  videoTitle: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: "bold",
    marginVertical: "3%",
  },
  videoLeftIcon: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
