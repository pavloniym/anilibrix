import {runInMain, runInProcess, runInRenderer} from "@@/utils/resolvers/system/processResolver";

export const APP_ABOUT = 'app:about';
export const APP_BROADCAST = 'app:broadcast';
export const APP_DEVTOOLS_MAIN = 'app:devtools:main';
export const APP_DEVTOOLS_TORRENT = 'app:devtools:torrent';

export default class AppResolver {

  /**
   * Show app about
   *
   * @return {void}
   */
  static showAbout() {
    runInProcess(
      electron => electron.ipcMain.on(APP_ABOUT, () => electron.app.showAboutPanel()),
      electron => electron.ipcRenderer.send(APP_ABOUT),
    );
  }


  /**
   * Show app devtools
   *
   * @param AppWindow
   * @return {void}
   */
  static showAppDevtools(AppWindow = null) {
    runInProcess(
      electron => electron.ipcMain.on(APP_DEVTOOLS_MAIN, () => AppWindow.showDevTools()),
      electron => electron.ipcRenderer.send(APP_DEVTOOLS_MAIN),
    );
  }

  /**
   * Show torrent devtools
   *
   * @param TorrentWindow
   * @return {void}
   */
  static showTorrentDevtools(TorrentWindow = null) {
    runInProcess(
      electron => electron.ipcMain.on(APP_DEVTOOLS_TORRENT, () => TorrentWindow.showDevTools()),
      electron => electron.ipcRenderer.send(APP_DEVTOOLS_TORRENT),
    );
  }


  /**
   * Broadcast event
   *
   * @param channel
   * @param payload
   */
  static broadcastEvent(channel, payload) {
    runInRenderer(electron => electron.ipcRenderer.send(APP_BROADCAST, {channel, payload}));
  }


  /**
   * Resolve broadcast event
   *
   * @param AppWindows
   */
  static resolveBroadcastEvent(AppWindows = []) {
    runInMain(electron => {
      electron.ipcMain.on(APP_BROADCAST, (e, {channel, payload = null} = {}) => {
        AppWindows.forEach(AppWindow =>
          AppWindow.getWindow().webContents.send(channel, {...payload})
        );
      });
    })
  }

}
