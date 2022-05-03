import Window from './appWindow'
import * as path from 'path'

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

    const iconsPath = path.join(__dirname, '../../build/icons/app');
    const icons = {
      win32: 'anilibria.ico',
      darwin: 'anilibria.icns',
      linux: '256x256.png'
    }

    return {
      height,
      width,
      minWidth,
      minHeight,
      show: false,
      frame: false,
      darkTheme: true,
      icon: path.join(iconsPath, icons[process.platform]),
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
