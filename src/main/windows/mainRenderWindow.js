import { BrowserWindow } from 'electron'

/**
 * Init main render window
 *
 * @return {Electron.BrowserWindow}
 */
const init = () => {
  return new BrowserWindow({
    height: 563,
    width: 1000,
    backgroundColor: '#282828',
    darkTheme: true, // Forces dark theme (GTK+3)
    show: true,
    title: 'anilibria',
    // titleBarStyle: 'hiddenInset', // Hide title bar (Mac)
    useContentSize: true, // Specify web page size without OS chrome
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'AudioVideoTracks',
      plugins: true,
      experimentalFeatures: true
      // offscreen: true,
    }
  })
};

export default {
  init
}
