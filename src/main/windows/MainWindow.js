import {BrowserWindow} from 'electron'

const MIN_HEIGHT = 720;
const HEIGHT = MIN_HEIGHT;
const MIN_WIDTH = 720;
const WIDTH = 1000;

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
    height: HEIGHT,
    width: WIDTH,
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    backgroundColor: '#121212',
    darkTheme: true, // Forces dark theme (GTK+3)
    show: true,
    frame: false,
    title: 'AniLibrix',
    useContentSize: true, // Specify web page size without OS chrome
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
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
  console.log('send:main', {channel, payload});
  instance.webContents.send(channel, payload)
};

export default {
  create,
  get,
  send
}
