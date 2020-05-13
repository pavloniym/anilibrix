import Window from './appWindow'

class WindowChromecast extends Window {


  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {
    return {
      show: false,
      skipTaskbar: true,
      useContentSize: true,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
      }
    }
  }


  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl() {
    return process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/chromecast.html`
      : `file://${__dirname}/chromecast.html`;
  }

}


export default new WindowChromecast();
