import Window from './appWindow'

class TorrentWindow extends Window {


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
      ? `http://localhost:9080/webtorrent.html`
      : `file://${__dirname}/webtorrent.html`;
  }

}

export default new TorrentWindow();
