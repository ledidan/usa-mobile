import {StyleSheet} from 'react-native';

import colors from 'styles/_variables';
const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: colors.black_light,
    alignItems: 'flex-end',
  },
  btn: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 50,
    alignItems: 'center',
  },
  btnLabel: {
    color: 'white',
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
