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
    show: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  })

  return instance;
}

export default {
  instance,
  init
}
