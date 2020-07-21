import {Main} from "@main/utils/windows";
import {download} from 'electron-dl';
import {v4 as uuid} from "uuid";
import {ipcRenderer, ipcMain, shell, app} from 'electron'

export const DOWNLOAD_INIT = 'app:download:init';

export const DOWNLOAD_OPEN = 'app:download:open';
export const DOWNLOAD_CANCEL = 'app:download:cancel';
export const DOWNLOAD_STARTED = 'app:download:started';
export const DOWNLOAD_PROGRESS = 'app:download:progress';

// Download storage
export const storage = {};
export const progress = {};


/**
 * Broadcast download handlers
 *
 */
export const broadcastDownloadHandlers = () => {

  const communications = [
    {channel: DOWNLOAD_INIT, callback: handleDownloadFile},
  ];

  communications.forEach(communication => {
    ipcMain.on(communication.channel, (e, payload) => communication.callback(payload))
  });

};


/**
 * Emit download file
 *
 * @param url
 * @param source
 * @param release
 * @param episode
 */
export const emitDownloadFile = ({url, source, release, episode} = {}) => {
  ipcRenderer.send(DOWNLOAD_INIT, {url, source, release, episode});
};


/**
 * Handle download file
 *
 * @param url
 * @param source
 * @param release
 * @param episode
 * @return {Promise<void>}
 */
export const handleDownloadFile = async ({url, source, release, episode}) => {

  // Create id
  const id = uuid();

  // Run download
  // Save file item emitter after promise resolve
  storage[id] = await download(Main.getWindow(), url, {
    saveAs: true,
    showBadge: false,
    onStarted: item => Main.sendToWindow(DOWNLOAD_STARTED, {id, item, source, release, episode}),
    onProgress: data => {

      // Check if previous progress for this file is smaller
      if (!progress[id] || progress[id] < data.percent) {

        // Set percentage
        progress[id] = data.percent;

        // Send progress
        Main.sendToWindow(DOWNLOAD_PROGRESS, {...data, id})
      }
    },
  });

};

/**
 * Handle download started event
 *
 * @param callback
 */
export const handleDownloadStarted = (callback) => ipcRenderer.on(DOWNLOAD_STARTED, (e, payload) => callback(payload));


/**
 * Handle download progress event
 *
 * @param callback
 */
export const handleDownloadProgress = (callback) => ipcRenderer.on(DOWNLOAD_PROGRESS, (e, payload) => callback(payload));
