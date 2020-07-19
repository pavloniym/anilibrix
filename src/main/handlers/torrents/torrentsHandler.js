import {Main, Torrent} from "@main/utils/windows";
import {ipcMain, ipcRenderer} from "electron";

export const TORRENT_PARSE = 'torrent:parse';
export const TORRENT_CLEAR = 'torrent:clear';
export const TORRENT_ERROR = 'torrent:error';
export const TORRENT_START = 'torrent:start';
export const TORRENT_SERVER = 'torrent:server';
export const TORRENT_DESTROY = 'torrent:destroy';
export const TORRENT_DOWNLOAD = 'torrent:download';
export const TORRENT_PARSED_DATA = 'torrent:data';


/**
 * Broadcast torrent events
 *
 * @return {void}
 */
export const broadcastTorrentEvents = () => {

  const communications = [
    {channel: TORRENT_CLEAR, window: () => Main},
    {channel: TORRENT_ERROR, window: () => Main},
    {channel: TORRENT_START, window: () => Torrent},
    {channel: TORRENT_SERVER, window: () => Main},
    {channel: TORRENT_DESTROY, window: () => Torrent},
    {channel: TORRENT_DOWNLOAD, window: () => Main},
  ];

  communications.forEach(communication => {
    ipcMain.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });

};


/**
 * Send torrent data to parse
 * Used in main process
 *
 * @param torrent_id
 * @param blob
 */
export const sendTorrentParse = (torrent_id, blob) => Torrent.sendToWindow(TORRENT_PARSE, {torrent_id, blob});


/**
 * Catch torrent parse
 * Used in webtorrent process
 *
 * @param callback
 */
export const catchTorrentParse = (callback) => ipcRenderer.on(TORRENT_PARSE, (e, payload) => callback(payload));


/**
 * Send torrent parsed data
 * Used in webtorrent window
 *
 * @param torrent_id
 * @param data
 */
export const sendTorrentParsedData = (torrent_id, data) => ipcRenderer.send(`${TORRENT_PARSED_DATA}:${torrent_id}`, data);


/**
 * Catch parsed torrent data
 * Used in main process
 *
 * @param torrent_id
 * @param callback
 */
export const catchTorrentParsedData = (torrent_id, callback) => ipcMain.on(`${TORRENT_PARSED_DATA}:${torrent_id}`, (e, data) => callback(data));


/**
 * Send torrent server
 * Used in webtorrent process
 *
 * @param payload
 */
export const sendTorrentServer = (payload) => ipcRenderer.send(TORRENT_SERVER, payload);


/**
 * Catch torrent server
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const catchTorrentServer = (callback) => ipcRenderer.on(TORRENT_SERVER, (e, payload) => callback(payload));

/**
 * Send torrent download
 * Used in webtorrent process
 *
 * @param payload
 */
export const sendTorrentDownload = (payload) => ipcRenderer.send(TORRENT_DOWNLOAD, payload);


/**
 * Catch torrent download
 * Used in renderer process
 *
 * @param callback
 */
export const catchTorrentDownload = (callback) => ipcRenderer.on(TORRENT_DOWNLOAD, (e, payload) => callback(payload));


/**
 * Send torrent clear
 * Used in webtorrent process
 *
 * @param payload
 */
export const sendTorrentClear = (payload) => ipcRenderer.send(TORRENT_CLEAR, payload);


/**
 * Catch torrent clear
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const catchTorrentClear = (callback) => ipcRenderer.on(TORRENT_CLEAR, (e, payload) => callback(payload));


/**
 * Send torrent error
 * Used in webtorrent process
 *
 * @param payload
 */
export const sendTorrentError = (payload) => ipcRenderer.send(TORRENT_ERROR, payload);


/**
 * Catch torrent clear
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const catchTorrentError = (callback) => ipcRenderer.on(TORRENT_ERROR, (e, payload) => callback(payload));


/**
 * Send torrent start
 *
 * @param torrentId
 * @param fileIndex
 */
export const sendTorrentStart = (torrentId, fileIndex) => ipcRenderer.send(TORRENT_START, {torrentId, fileIndex});


/**
 * Catch torrent start
 * Used in webtorrent process
 *
 * @param callback
 */
export const catchTorrentStart = (callback) => ipcRenderer.on(TORRENT_START, (e, payload) => callback(payload));


/**
 * Send torrent destroy
 *
 * @param payload
 */
export const sendTorrentDestroy = (payload) => ipcRenderer.send(TORRENT_DESTROY, payload);


/**
 * Catch torrent destroy
 * Used in webtorrent process
 *
 * @param callback
 */
export const catchTorrentDestroy = (callback) => ipcRenderer.on(TORRENT_DESTROY, (e, payload) => callback(payload));
