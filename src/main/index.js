import {app, ipcMain as ipc, dialog} from 'electron' // eslint-disable-line
import {mainWindow, torrentWindow} from './windows'
import { autoUpdater } from "electron-updater"

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
  mainInstance = mainWindow.init();
  mainInstance.loadURL(mainWindowURL);
  mainInstance.setMenu(null);

  // Send events to main window
  ipc.on('send:main', (e, {channel, payload}) => {
    console.log('send:main', {channel, payload});
    mainInstance.webContents.send(channel, payload)
  });


  // Init torrent-process-window
  torrentInstance = torrentWindow.init();
  torrentInstance.loadURL(torrentWindowUrl);

  // Send events to torrent window
  ipc.on('send:torrent', (e, {channel, payload}) => {
    console.log('send:torrent', {channel, payload});
    torrentInstance.webContents.send(channel, payload)
  })

}

app.on('ready', () => {

  // Create window
  createWindow();

  // This will immediately download an update, then install when the app quits.
  autoUpdater.checkForUpdatesAndNotify();

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
