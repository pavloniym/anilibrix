import { Main, Torrent } from '@main/utils/windows';
import { app, ipcMain, ipcRenderer } from 'electron';
import {
  start as startSystemSleepBlocker,
  stop as stopSystemSleepBlocker
} from '../../utils/powerSaveBlocker'
import { getDecrypted, setEncrypted } from '@main/utils/safeStorage'

export const APP_ABOUT = 'app:about';
export const APP_SYSTEM_SLEEP_DISABLE = 'app:system:disable_sleep';
export const APP_SYSTEM_SLEEP_ENABLE = 'app:system:enable_sleep';
export const APP_DOCK_NUMBER = 'app:dock:number';
export const APP_DEVTOOLS_MAIN = 'app:devtools:main';
export const APP_DEVTOOLS_TORRENT = 'app:devtools:torrent';
export const APP_SAFE_STORAGE_ENCRYPT_REQUEST = 'app:system:safe_storage:encrypt';
export const APP_SAFE_STORAGE_DECRYPT_REQUEST = 'app:system:safe_storage:decrypt';

/**
 * Send app about event
 *
 * @return {void}
 */
export const sendAppAboutEvent = () => ipcRenderer.send(APP_ABOUT);

/**
 * Listen app about event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppAboutEvent = () => ipcMain.on(APP_ABOUT, () => app.showAboutPanel());

/**
 * Send app devtools main event
 *
 * @return {void}
 */
export const sendAppDevtoolsMainEvent = () => ipcRenderer.send(APP_DEVTOOLS_MAIN);

/**
 * Listen app devtools main event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppDevtoolsMainEvent = () => ipcMain.on(APP_DEVTOOLS_MAIN, () => Main.showDevTools());

/**
 * Send app devtools torrent event
 *
 * @return {void}
 */
export const sendAppDevtoolsTorrentEvent = () => ipcRenderer.send(APP_DEVTOOLS_TORRENT);

/**
 * Listen app devtools torrent event
 *
 * @return {Electron.IpcMain}
 */
export const catchAppDevtoolsTorrentEvent = () => ipcMain.on(APP_DEVTOOLS_TORRENT, () => Torrent.showDevTools());

/**
 * Send app docker number event
 *
 * @param number
 * @return {void}
 */
export const sendAppDockNumberEvent = (number) => ipcRenderer.send(APP_DOCK_NUMBER, number);

/**
 * Listen app dock number event
 *
 * @return {void}
 */

export const catchAppDockNumberEvent = () => {
  ipcMain.on(APP_DOCK_NUMBER, (e, number) => {
    if (app.dock) app.dock.setBadge(number && number > 0 ? number.toString() : '');
  });
};

/**
 * Send app system sleep blocker enable event
 *
 * @param number
 * @return {void}
 */
export const sendEnableSystemSleepBlockerEvent = (number) => ipcRenderer.send(APP_SYSTEM_SLEEP_DISABLE);

/**
 * Listen app system sleep blocker enable event
 *
 * @return {void}
 */
export const catchEnableSystemSleepBlockerEvent = () => {
  ipcMain.on(APP_SYSTEM_SLEEP_DISABLE, (e) => {
    startSystemSleepBlocker()
  });
};

/**
 * Send app system sleep blocker disable event
 *
 * @param number
 * @return {void}
 */
export const sendDisableSystemSleepBlockerEvent = (number) => ipcRenderer.send(APP_SYSTEM_SLEEP_ENABLE);

/**
 * Listen app system sleep blocker disable event
 *
 * @return {void}
 */
export const catchDisableSystemSleepBlockerEvent = () => {
  ipcMain.on(APP_SYSTEM_SLEEP_ENABLE, (e) => {
    stopSystemSleepBlocker()
  });
};

/**
 * Send encrypt request to safe storage
 *
 * @param {string} prop Property name
 * @param {string} data Data to encrypt
 * @return {Promise<string>}
 */
export const invokeSafeStorageEncrypt = (prop, data) => ipcRenderer.invoke(APP_SAFE_STORAGE_ENCRYPT_REQUEST, prop, data);

/**
 * Listen encrypt request to safe storage
 *
 * @return {void}
 */
export const handleSafeStorageEncrypt = () => {
  ipcMain.handle(APP_SAFE_STORAGE_ENCRYPT_REQUEST, async (event, prop, data) => {
    return setEncrypted(prop, data)
  })
}
