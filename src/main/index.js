import {app, ipcMain as ipc, dialog} from 'electron' // eslint-disable-line
import {MainWindow, TorrentWindow} from './windows'
// import {autoUpdater} from "electron-updater"

import store from '@store'; // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

const mainWindowURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

const torrentWindowUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/webtorrent.html`
  : `file://${__dirname}/webtorrent.html`;


let mainInstance = null;
let torrentInstance = null;

function createWindow() {

  // Init main-render-window-instance
  mainInstance = MainWindow.create();
  mainInstance.loadURL(mainWindowURL);

  // Init torrent-process-window
  torrentInstance = TorrentWindow.create();
  torrentInstance.loadURL(torrentWindowUrl);
}


app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainInstance === null) {
    createWindow()
  }
});

export default {}
