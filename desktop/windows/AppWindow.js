import BaseWindow from "./BaseWindow";

export default class AppWindow extends BaseWindow {

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
        nodeIntegration: true,
        enableRemoteModule: true,
        experimentalFeatures: true,
        allowRunningInsecureContent: true
      },
      backgroundColor: '#121212',
    }
  }

}
