// Utils
import {v4 as uuid} from 'uuid'

// Resolvers
import {runInMain, runInRenderer} from "@@/utils/resolvers/system/processResolver";

// Event Bus
import {EventBus} from "@plugins/vue-event-bus";
import AppResolver from "@@/utils/resolvers/app";
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";

// Events
export const TORRENTS_EVENT = 'torrents:event';
export const TORRENTS_PARSE = 'torrents:parse';
export const TORRENTS_START = 'torrents:start';
export const TORRENTS_CLEAR = 'torrents:clear';
export const TORRENTS_PROGRESS = 'torrents:progress';

export default class TorrentsResolver {

  /**
   * Parse torrent
   * Parse torrent id and torrent file content as buffer
   *
   * @param torrents_id
   * @param torrents_file_content
   * @return {Promise}
   */
  static async parseTorrent({torrents_id, torrents_file_content} = {}) {
    return runInRenderer(async electron =>
      this._sendTorrentsWindowEvent(electron, TORRENTS_PARSE, {torrents_id, torrents_file_content})
    )
  }


  /**
   * Start torrent
   * Provide torrent id and file index to start local server
   *
   * @param torrents_id
   * @param file_index
   * @return {Promise}
   */
  static async startTorrent({torrents_id, file_index} = {}) {
    return runInRenderer(async electron =>
      this._sendTorrentsWindowEvent(electron, TORRENTS_START, {torrents_id, file_index})
    )
  }


  /**
   * Destroy torrent
   *
   * @param torrents_id
   * @return {Promise}
   */
  static async clearTorrent({torrents_id} = {}) {
    return runInRenderer(async electron =>
      this._sendTorrentsWindowEvent(electron, TORRENTS_CLEAR, {torrents_id})
    )
  }


  /**
   * Emit torrent watcher event
   *
   * @param torrents_id
   * @param payload
   * @return {Promise<void>}
   */
  static async emitTorrentProgressWatcher({torrents_id, payload} = {}) {
    runOnPlatform(
      () => console.log('TODO: torrent progress on web'),
      () => AppResolver.broadcastEvent(TORRENTS_PROGRESS, {torrents_id, payload})
    );
  }

  /**
   * Catch torrent watcher event
   *
   * @param callback
   */
  static catchTorrentProgressWatcher(callback) {
    runOnPlatform(
      () => console.log('TODO: catch torrent progress on web'),
      () =>
        runInRenderer(electron => electron.ipcRenderer.on(TORRENTS_PROGRESS, (e, payload) => callback(payload)))
    )
  }


  /**
   * Resolve torrents window event
   *
   * @param TorrentsWindow
   * @return {void}
   */
  static async resolveTorrentsWindowEvent(TorrentsWindow) {
    runInMain(async electron => await electron.ipcMain.handle(TORRENTS_EVENT, (e, {channel, token, ...payload}) => {
      return new Promise(resolve => {

        // Save original event token
        const event_token = token;

        // Set event to torrent
        // Send event token
        TorrentsWindow.getWindow().webContents.send(channel, {...payload, token});

        // Catch event from torrents window
        // Listen to provided channel
        // Check event response token
        electron.ipcMain.on(channel, (e, {token, ...response}) => {
          if (token === event_token) resolve(response);
        })
      });
    }))
  }


  /**
   * Send event
   *
   * @param electron
   * @param channel
   * @param payload
   * @return {Promise<any>}
   * @private
   */
  static async _sendTorrentsWindowEvent(electron, channel, payload = null) {
    return electron.ipcRenderer.invoke(TORRENTS_EVENT, {token: uuid(), channel, ...payload})
  }

}
