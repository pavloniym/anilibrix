import {BrowserWindow} from "electron";

export default class Window {

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
   * Get window url
   *
   * @return String|null
   */
  getWindowUrl() {
    return null;
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
   * @return this
   */
  loadUrl() {
    if (this.getWindow() && this.getWindowUrl()) {
      this.getWindow().loadURL(this.getWindowUrl());
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
    if (this.getWindow()) {

      this.getWindow().webContents.send(channel, payload);

      if (process.env.NODE_ENV === 'development') {
        console.log({channel, payload})
      }
    }

    return this;
  }


  /**
   * Show devtools
   *
   * @return void
   */
  showDevTools() {
    this.getWindow().webContents.openDevTools();
  }

}
