import {Main, Torrent} from "@main/utils/windows";
import {app, ipcMain as ipc, ipcMain, ipcRenderer} from "electron";

export const APP_ABOUT = 'app:about';
export const APP_DOCK_NUMBER = 'app:dock:number';
export const APP_NOTIFICATION = 'app:notification';
export const APP_DEVTOOLS_MAIN = 'app:devtools:main';
export const APP_DEVTOOLS_TORRENT = 'app:devtools:torrent';

/**
 * Listen app about event
 *
 * @return {Electron.IpcMain}
 */
export const listenAppAboutEvent = () => ipcMain.on(APP_ABOUT, () => app.showAboutPanel());


/**
 * Send app about event
 *
 * @return {void}
 */
export const sendAppAboutEvent = () => ipcRenderer.send(APP_ABOUT);


/**
 * Send app notification event from renderer to main
 *
 * @param payload
 * @return {void}
 */
export const sendAppNotificationEvent = (payload) => ipcRenderer.send(APP_NOTIFICATION, payload);


/**
 * Listen to app notification event on main process
 * Send app notification payload to window
 *
 * @return {void}
 */
export const listenAppNotificationEvent = () => {
  ipcMain.on(APP_NOTIFICATION, (e, payload) => Main.sendToWindow(APP_NOTIFICATION, payload));
};


/**
 * Handle app notification event
 *
 * @param callback
 * @return {void}
 */
export const handleAppNotificationEvent = (callback) => {
  ipcRenderer.on(APP_NOTIFICATION, (e, payload) => callback ? callback(payload) : null);
};


/**
 * Listen app devtools main event
 *
 * @return {Electron.IpcMain}
 */
export const listenAppDevtoolsMainEvent = () => ipcMain.on(APP_DEVTOOLS_MAIN, () => Main.showDevTools());


/**
 * Send app devtools main event
 *
 * @return {void}
 */
export const sendAppDevtoolsMainEvent = () => ipcRenderer.send(APP_DEVTOOLS_MAIN);


/**
 * Listen app devtools torrent event
 *
 * @return {Electron.IpcMain}
 */
export const listenAppDevtoolsTorrentEvent = () => ipcMain.on(APP_DEVTOOLS_TORRENT, () => Torrent.showDevTools());


/**
 * Send app devtools torrent event
 *
 * @return {void}
 */
export const sendAppDevtoolsTorrentEvent = () => ipcRenderer.send(APP_DEVTOOLS_TORRENT);


/**
 * Listen app dock number event
 *
 * @return {void}
 */
export const listenAppDockNumberEvent = () => {
  ipcMain.on(APP_DOCK_NUMBER, (e, number) => {
    if (app.dock) app.dock.setBadge(number && number > 0 ? number.toString() : '');
  });
};


/**
 * Send app docker number event
 *
 * @param number
 * @return {void}
 */
export const sendAppDockNumberEvent = (number) => ipcRenderer.send(APP_DOCK_NUMBER, number);
