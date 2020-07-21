import {Main, Torrent} from "@main/utils/windows";
import {app, ipcMain, ipcRenderer} from "electron";

export const APP_ABOUT = 'app:about';
export const APP_DOCK_NUMBER = 'app:dock:number';
export const APP_DEVTOOLS_MAIN = 'app:devtools:main';
export const APP_DEVTOOLS_TORRENT = 'app:devtools:torrent';


/**
 * Broadcast app handlers
 *
 */
export const broadcastAppHandlers = () => {

  const communications = [
    {channel: APP_ABOUT, callback: () => app.showAboutPanel()},
    {channel: APP_DOCK_NUMBER, callback: handleAppDockNumber},
    {channel: APP_DEVTOOLS_MAIN, callback: () => Main.showDevTools()},
    {channel: APP_DEVTOOLS_TORRENT, callback: () => Torrent.showDevTools()},
  ];

  communications.forEach(communication => {
    ipcMain.on(communication.channel, (e, payload) => communication.callback(payload))
  });

};


/**
 * Send app about event
 *
 */
export const emitAppAbout = () => ipcRenderer.send(APP_ABOUT);


/**
 * Send app devtools main event
 *
 */
export const emitAppDevtoolsMain = () => ipcRenderer.send(APP_DEVTOOLS_MAIN);


/**
 * Send app devtools torrent event
 *
 */
export const emitAppDevtoolsTorrent = () => ipcRenderer.send(APP_DEVTOOLS_TORRENT);


/**
 * Send app docker number event
 *
 * @param number
 */
export const emitAppDockNumber = (number) => ipcRenderer.send(APP_DOCK_NUMBER, number);


/**
 * Handle app dock number event
 * Check if app dock is available (is mac os)
 *
 */
const handleAppDockNumber = number => {
  if (app.dock) app.dock.setBadge(number && number > 0 ? number.toString() : '');
};
