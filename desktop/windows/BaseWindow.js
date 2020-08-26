import {BrowserWindow} from "electron";

export default class BaseWindow {

  /**
   * Constructor
   *
   * @return Window
   */
  constructor() {
    this._window = null;
  }


  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    return {};
  }


  /**
   * Get window
   *
   * @return BrowserWindow|null
   */
  getWindow() {
    return this._window;
  }

  /**
   * Create window
   *
   * @return this
   */
  createWindow(configuration) {
    this._window = new BrowserWindow({...this.getWindowConfiguration(), ...configuration});
    return this;
  }


  /**
   * Load window url
   *
   * @param devPath
   * @param prodPath
   * @return this
   */
  loadURL(devPath, prodPath) {
    if (this.getWindow()) {
      this.getWindow().loadURL(
        process.env.WEBPACK_DEV_SERVER_URL
          ? process.env.WEBPACK_DEV_SERVER_URL + devPath
          : `app://./${prodPath}`
      );
    }

    return this;
  }


  /**
   * Send to window
   *
   * @param channel
   * @param payload
   */
  sendToWindow(channel, payload) {

    // Send to window
    // Log to console on dev
    if (this.getWindow()) this.getWindow().webContents.send(channel, payload);
    if (process.env.NODE_ENV === 'development') console.log({channel, payload});

    return this;
  }


  /**
   * Show devtools
   *
   * @return void
   */
  showDevTools() {
    this.getWindow().openDevTools({mode: 'detach'});
  }

}
