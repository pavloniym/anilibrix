import {Main} from "@main/utils/windows";
import {ipcRenderer} from "electron";

export const APP_ERROR = 'app:error';
export const APP_NOTIFICATION_RELEASE = 'app:notification:release';


/**
 * Send app error
 *
 * @param error
 * @return {MainWindow}
 */
export const showAppError = (error) => Main.sendToWindow(APP_ERROR, error);


/**
 * Show release notification
 *
 * @param release
 * @return {MainWindow}
 */
export const sendReleaseNotification = (release) => Main.sendToWindow(APP_NOTIFICATION_RELEASE, release);


/**
 * Catch release notification
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const catchReleaseNotification = (callback) =>
  ipcRenderer.on(APP_NOTIFICATION_RELEASE, (e, release) => callback(release));
