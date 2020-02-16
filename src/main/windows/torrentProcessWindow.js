import { BrowserWindow } from 'electron'

let instance = null

/**
 * Init torrent process window
 * It is hidden
 *
 * @return {Electron.BrowserWindow}
 */
const init = () => {
  instance = new BrowserWindow({
    backgroundColor: '#1E1E1E',
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 150,
    width: 150,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
    title: 'torrent-process-window',
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'AudioVideoTracks',
      devTools: true
    }
  })

  return instance;
}

export default {
  instance,
  init
}
