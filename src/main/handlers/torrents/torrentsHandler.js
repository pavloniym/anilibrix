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
    {channel: TORRENT_PARSE, window: () => Torrent},
    {channel: TORRENT_CLEAR, window: () => Main},
    {channel: TORRENT_ERROR, window: () => Main},
    {channel: TORRENT_START, window: () => Torrent},
    {channel: TORRENT_SERVER, window: () => Main},
    {channel: TORRENT_DESTROY, window: () => Torrent},
    {channel: TORRENT_DOWNLOAD, window: () => Main},
    {channel: TORRENT_PARSED_DATA, window: () => Main}
  ];

  communications.forEach(communication => {
    ipcMain.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });

};


/**
 * Emit event to parse torrent blob file in webtorrent window
 *
 * @param torrent_id
 * @param blob
 */
export const emitTorrentParsing = (torrent_id, blob) => ipcRenderer.send(TORRENT_PARSE, {torrent_id, blob});


/**
 * Handle torrent parsing event in webtorrent window
 *
 * @param callback
 */
export const handleTorrentParsing = (callback) => ipcRenderer.on(TORRENT_PARSE, (e, payload) => callback(payload));


/**
 * Send torrent parsed data from webtorrent window
 *
 * @param torrent_id
 * @param data
 */
export const emitTorrentParsed = (torrent_id, data) => ipcRenderer.send(TORRENT_PARSED_DATA, {torrent_id, data});


/**
 * Catch parsed torrent data in app window
 *
 * @param callback
 */
export const handleTorrentParsed = (callback) => ipcRenderer.on(TORRENT_PARSED_DATA, (e, payload) => callback(payload));


/**
 * Send torrent start event to webtorrent window
 *
 * @param torrent_id
 * @param file_index
 */
export const emitTorrentStart = (torrent_id, file_index) => ipcRenderer.send(TORRENT_START, {torrent_id, file_index});


/**
 * Catch torrent start event in webtorrent window
 *
 * @param callback
 */
export const handleTorrentStart = (callback) => ipcRenderer.on(TORRENT_START, (e, payload) => callback(payload));


/**
 * Send torrent server payload from webtorrent window
 *
 * @param payload
 */
export const emitTorrentServer = (payload) => ipcRenderer.send(TORRENT_SERVER, payload);


/**
 * Catch torrent server
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const handleTorrentServer = (callback) => ipcRenderer.on(TORRENT_SERVER, (e, payload) => callback(payload));


/**
 * Send torrent download progress event from webtorrent
 *
 * @param payload
 */
export const emitTorrentDownload = (payload) => ipcRenderer.send(TORRENT_DOWNLOAD, payload);


/**
 * Catch torrent download event
 *
 * @param callback
 */
export const handleTorrentDownload = (callback) => ipcRenderer.on(TORRENT_DOWNLOAD, (e, payload) => callback(payload));


/**
 * Send torrent destroy
 *
 * @param payload
 */
export const emitTorrentDestroy = (payload) => ipcRenderer.send(TORRENT_DESTROY, payload);


/**
 * Catch torrent destroy in webtorrent
 *
 * @param callback
 */
export const handleTorrentDestroy = (callback) => ipcRenderer.on(TORRENT_DESTROY, (e, payload) => callback(payload));


/**
 * Send torrent clear event from webtorrent
 * @param payload
 */
export const emitTorrentClear = (payload) => ipcRenderer.send(TORRENT_CLEAR, payload);


/**
 * Catch torrent clear
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const handleTorrentClear = (callback) => ipcRenderer.on(TORRENT_CLEAR, (e, payload) => callback(payload));


/**
 * Send torrent error in webtorrent window
 *
 * @param payload
 */
export const emitTorrentError = (payload) => ipcRenderer.send(TORRENT_ERROR, payload);


/**
 * Catch torrent clear
 *
 * @param callback
 * @return {Electron.IpcRenderer}
 */
export const handleTorrentError = (callback) => ipcRenderer.on(TORRENT_ERROR, (e, payload) => callback(payload));
