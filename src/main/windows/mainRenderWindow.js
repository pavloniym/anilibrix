import { BrowserWindow } from 'electron'

const MIN_HEIGHT = 650;
const HEIGHT = MIN_HEIGHT;
const MIN_WIDTH = 650;
const WIDTH = 1000;

/**
 * Init main render window
 *
 * @return {Electron.BrowserWindow}
 */
const init = () => {
  return new BrowserWindow({
    height: HEIGHT,
    width: WIDTH,
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    backgroundColor: '#121212',
    darkTheme: true, // Forces dark theme (GTK+3)
    show: true,
    frame: false,
    title: 'anilibria',
    useContentSize: true, // Specify web page size without OS chrome
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'AudioVideoTracks',
      plugins: true,
      experimentalFeatures: true
    }
  })
};

export default {
  init
}
