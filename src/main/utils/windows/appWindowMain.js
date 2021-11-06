import Window from './appWindow'

class MainWindow extends Window {


  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {

    const width = 1120;
    const height = 720;
    const minWidth = 820;
    const minHeight = 520;

    return {
      height,
      width,
      minWidth,
      minHeight,
      show: true,
      frame: false,
      darkTheme: true,
      titleBarStyle: 'hiddenInset',
      useContentSize: true,
      webPreferences: {
        webgl: true,
        webviewTag: true,
        webSecurity: false,
        autoplayPolicy: 'no-user-gesture-required',
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        experimentalFeatures: true,
        allowRunningInsecureContent: true,
      },
      backgroundColor: '#121212',
    }
  }


  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl() {
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:9080'
      : `file://${__dirname}/index.html`;
  }

}


export default new MainWindow();
