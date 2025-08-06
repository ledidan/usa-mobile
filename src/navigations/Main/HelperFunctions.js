import Sound from 'react-native-sound';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { useNavigation } from '@react-navigation/native';

// [BEGIN - AUDIO section]

const _setAudioMode = async () => {
  console.log('Failed to load the sound', error);
};
Sound.setCategory('Playback'); 

const withNavigationHOC = (Component) => {
  return function (props) {
    return <Component {...props}  />;
  };
};

const _loadAudio = source => {
  return new Promise((resolve, reject) => {
    const sound = new Sound(source, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        reject(error);
      } else {
        resolve(sound);
      }
    });
  });
};
//[END - AUDIO section]

//[BEGIN - Foreground service section]
const defaultOptions = {
  delay: 100,
  onLoop: false,
  onError: e => {
    console.log("Error Background Task ==>", e);
  },
};
/**
 * backgroundTask callback function and taskId number are require
 * @param {Function} backgroundTask
 * @param {Number} taskId
 * @param {Object} options
 * @returns
 */
const _startBackgroundTask = (
  backgroundTask,
  taskId,
  options = defaultOptions,
) => {
  if (ReactNativeForegroundService.is_task_running(String(taskId))) {
    return;
  }
  ReactNativeForegroundService.add_task(backgroundTask, {
    ...options,
    taskId: String(taskId),
  });
  return ReactNativeForegroundService.start({
    id: Number(taskId),
    title: "Skipli Ordering Services",
    message: "You are connecting with Skipli Ordering Services",
  });
};
const _stopBackgroundTask = taskId => {
  // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
  if (ReactNativeForegroundService.is_task_running(String(taskId))) {
    ReactNativeForegroundService.remove_task(String(taskId));
  }
  // Stoping Foreground service.
  return ReactNativeForegroundService.stop();
};
//[END - Foreground service section]

const _verifyShopBasicInfo = ({ shopInfo = {} }) => {
  const { address = "", name = "", salesTax = "0" } = shopInfo;
  try {
    if (!name) throw "Shop must have a name";
    else if (!address) throw "Shop must have an address";
    else if (parseFloat(salesTax) < 0 || parseFloat(salesTax) === 0)
      throw "Sales tax must be greater than 0";
    return true;
  } catch (error) {
    throw error;
  }
};

export {
  _setAudioMode,
  _loadAudio,
  _startBackgroundTask,
  _stopBackgroundTask,
  _verifyShopBasicInfo,
  withNavigationHOC
};
