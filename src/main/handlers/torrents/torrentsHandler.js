import {ipcMain} from "electron";
import {Torrent} from "@main/utils/windows";

export const TORRENT_PARSE = 'torrent:parse';
export const TORRENT_PARSED_DATA = 'torrent:data';


/**
 * Send torrent data to parse
 *
 * @param torrent
 * @param data
 * @return {void}
 */
export const sendTorrentDataToParse = (torrent, data) => {
  Torrent.sendToWindow(TORRENT_PARSE, {torrentId: torrent.id, blob: data});
};


/**
 * Catch parsed torrent data
 *
 * @param torrent
 * @param callback
 * @return {void}
 */
export const catchParsedTorrentData = (torrent, callback) => {
  ipcMain.on(`${TORRENT_PARSED_DATA}:${torrent.id}`, (e, {data}) => callback(data));
};
