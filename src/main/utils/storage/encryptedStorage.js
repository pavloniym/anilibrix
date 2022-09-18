import {safeStorage} from 'electron'
import ElectronStore from 'electron-store'

const encryptedStorage = new ElectronStore({name: 'anilibrix__safe', clearInvalidConfig: true});


/**
 * Save to encrypted storage
 *
 * @param key
 * @param value
 * @return {void}
 */
const saveToEncryptedStorage = ({key, value}) => {
  if (safeStorage.isEncryptionAvailable()) {
    encryptedStorage.set(key, safeStorage.encryptString(value).toString('base64'))
  }
}


/**
 * Fetch from encrypted storage
 *
 * @param key
 * @return {*}
 */
const fetchFromEncryptedStorage = (key) => {
  if (safeStorage.isEncryptionAvailable()) {
    const storageValue = encryptedStorage.get(key) || null;
    const encryptedValue = storageValue ? Buffer.from(storageValue, 'base64') : null;

    return encryptedValue ? safeStorage.decryptString(encryptedValue) : null;
  }
  return null;
}


/**
 * Remove from encrypted storage
 *
 * @param key
 * @return {void}
 */
const removeFromEncryptedStorage = key => encryptedStorage.delete(key);


export {
  saveToEncryptedStorage,
  fetchFromEncryptedStorage,
  removeFromEncryptedStorage
}
