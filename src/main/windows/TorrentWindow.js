import { BrowserWindow } from 'electron'

/**
 * Store instance
 *
 * @type {null}
 */
let instance = null;


/**
 * Get window instance
 * @return {null}
 */
const get = () => instance;


/**
 * Init main render window
 *
 * @return {Electron.BrowserWindow}
 */
const create = () => {
  instance = new BrowserWindow({
    show: false,
    skipTaskbar: true,
    title: 'torrent-process-window',
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  });

  return instance;
};


/**
 * Send to main channel
 * @param channel
 * @param payload
 */
const send = (channel, payload) => {
  console.log('send:torrent', {channel, payload});
  instance.webContents.send(channel, payload)
};

export default {
  create,
  get,
  send
}
