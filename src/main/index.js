import {app, ipcMain as ipc} from 'electron' // eslint-disable-line
import {mainWindow, torrentWindow} from './windows'

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
  // Init torrent-process-window
  mainInstance = mainWindow.init();
  torrentInstance = torrentWindow.init();

  // Load urls
  mainInstance.loadURL(mainWindowURL);
  torrentInstance.loadURL(torrentWindowUrl);


  // Send events to main window
  ipc.on('send:main', (e, {channel, payload}) => {
    console.log('send:main', {channel, payload});
    mainInstance.webContents.send(channel, payload)
  });

  // Send events to torrent window
  ipc.on('send:torrent', (e, {channel, payload}) => {
    console.log('send:torrent', {channel, payload});
    torrentInstance.webContents.send(channel, payload)
  })

}

app.on('ready', createWindow);
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


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
