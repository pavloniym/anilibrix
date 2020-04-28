import store from '@store'; // eslint-disable-line
import {SentryElectron} from './../utils/sentry'

// Enable Sentry.io electron handler
SentryElectron({store});


import AppTray from './../utils/tray'
import AppFolders from './../utils/folders'
import {app, ipcMain as ipc} from 'electron'
import {MainWindow, TorrentWindow} from './windows'


const AppTray = new AppTray();
const AppFolders = new AppFolders();


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

/**
 * Create windows
 */
const createWindows = () => {

  MainWindow.create().loadURL(mainWindowURL);
  TorrentWindow.create().loadURL(torrentWindowUrl);

  // Set events between windows
  ipc.on('torrent:start', (e, payload) => TorrentWindow.send('torrent:start', payload));
  ipc.on('torrent:destroy', () => TorrentWindow.send('torrent:destroy'));
  ipc.on('torrent:server', (e, payload) => MainWindow.send('torrent:server', payload));

};



app.on('ready', () => {

  // Create windows
  createWindows();

  // Create tray icon
  // Set data folder
  AppTray.createTrayIcon({MainWindow});
  AppFolders.setDataFolder();

});

app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null);
app.on('activate', () => MainWindow.get() === null ? createWindows() : null);
