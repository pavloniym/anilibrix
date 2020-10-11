// Utils
import {v4 as uuid} from 'uuid'

// Resolvers
import {runInMain, runInRenderer} from "@@/utils/resolvers/system/processResolver";
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";

export const TORRENTS_EVENT = 'torrents:event';
export const TORRENTS_PARSE = 'torrents:parse';

export default class TorrentsResolver {

  /**
   * Parse torrent
   *
   * @param torrents_id
   * @param torrents_file_content
   * @return {Promise<undefined>}
   */
  static async parseTorrent(torrents_id, torrents_file_content) {

    const token = uuid();
    const channel = TORRENTS_PARSE;

    return runOnPlatform(
      async () => null,
      async () => runInRenderer(async electron =>
        electron.ipcRenderer.invoke(TORRENTS_EVENT, {token, channel, torrents_id, torrents_file_content})
      )
    );

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


}
