import {Main} from "@main/utils/windows";
import {ipcMain, ipcRenderer} from "electron";

export const APP_ERROR = 'app:error';
export const APP_NOTIFICATION_RELEASE = 'app:notification:release';


/**
 * Broadcast notification events
 *
 * @return {void}
 */
export const broadcastNotificationsEvents = () => {

  const communications = [
    {channel: APP_ERROR, window: () => Main},
    {channel: APP_NOTIFICATION_RELEASE, window: () => Main},
  ];

  communications.forEach(communication => {
    ipcMain.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });
};


/**
 * Emit app error
 *
 * @param error
 */
export const emitAppError = (error) => ipcRenderer.send(APP_ERROR, error);

/**
 * Fire callback on app error event
 *
 * @param callback
 */
export const handleAppError = (callback) => ipcRenderer.on(APP_ERROR, (e, error) => callback(error));


/**
 * Show release notification
 *
 * @param release
 */
export const emitReleaseNotification = (release) => ipcRenderer.send(APP_NOTIFICATION_RELEASE, release);


/**
 * Catch release notification
 *
 * @param callback
 */
export const handleReleaseNotification = (callback) => ipcRenderer.on(APP_NOTIFICATION_RELEASE, (e, release) => callback(release));
