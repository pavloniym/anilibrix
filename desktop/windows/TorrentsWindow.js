import BaseWindow from "./BaseWindow";

export default class TorrentsWindow extends BaseWindow {

  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    return {
      show: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    }
  }

}
