// BUTI Corp All right Reserved ©
// Son That Ton
// john@buti.io
import SInfo from 'react-native-sensitive-info';

const getItemFromStorage = (itemName) => {
  return new Promise((resolve, reject) => {
    SInfo.getItem(itemName, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    })
      .then(item => {
        if (item) {
          resolve(JSON.parse(item));
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

const saveItemIntoStorage = (itemName, value) => {
  return new Promise((resolve, reject) => {
    SInfo.setItem(itemName, JSON.stringify(value), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    })
      .then(() => resolve(200))
      .catch(err => reject(err));
  });
};

const removeItemFromStorage = (itemName) => {
  return new Promise((resolve, reject) => {
    SInfo.deleteItem(itemName, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    })
      .then(() => resolve(200))
      .catch(err => reject(err));
  });
};

const createDB = ({ name, initialValue }) => {
  return new Promise((resolve, reject) => {
    getItemFromStorage(name).then(item => {
      if (!item) {
        SInfo.setItem(name, JSON.stringify(initialValue), {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        })
          .then(() => resolve(200))
          .catch(() => reject(null));
      }
    });
  });
};

export default {
  createDB,
  getItemFromStorage,
  saveItemIntoStorage,
  removeItemFromStorage,
};
