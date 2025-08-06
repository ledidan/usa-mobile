import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import colors from 'styles/_variables';
const Style = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    marginTop: 15,
  },
  navContainer: {
    marginLeft: 20,
    marginBottom: 80,
  },
  logo: {
    alignSelf: 'flex-start',
    flex: 1,
    marginHorizontal: '8%',
    marginRight: 80,
  },
  icon_battery: {
    padding: 5,
  },
  icon_battery_container: {
    backgroundColor: '#FFF95E',
    borderRadius: 100,
  },
  betaBtn: {flex: 1},
  infoContainer: {
    marginVertical: responsiveHeight(2),
    marginHorizontal: '8%',
  },
  address: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.4),
  },
  scrollViewContainer: {flexGrow: 1},
  drawerItem: {
    width: '100%',
    marginLeft: 0,
    marginVertical: 2,
    borderRadius: 0,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(6.5),
  },
  label: { fontSize: responsiveFontSize(1.1), fontWeight: 700 },
  notifLabel: {
    color: '#fff',
    borderRadius: 50,
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
    paddingHorizontal: '5%',
    paddingVertical: responsiveHeight(0.3),
    marginLeft: '18%',
  },
  notifLabelBackground: { backgroundColor: colors.primary },
  helpFooter: {
    paddingVertical: responsiveHeight(1),
    borderTopWidth: 0.8,
    borderColor: colors.border_color,
    backgroundColor: colors.primary,
    paddingLeft: '8%',
  },
  helpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 1,
    marginRight: "8%",
    gap: 8,
  },
  helpText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.1),
    paddingVertical: 2,
    color: "#fff",
  },
  drawerItemActive: {
    borderColor: colors.primary,
    borderRightWidth: 3,
  },
  textColor: { color: colors.white },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "100%",
    marginVertical: 2,
  },
  versionText: {
    fontSize: responsiveFontSize(0.9),
    color: "#fff",
  },
});

const drawer = {
  contentOptions: {
    activeBackgroundColor: colors.primary,
    inactiveBackgroundColor: 'white',
    activeTintColor: 'white',
  },
};
export {Style, drawer};
