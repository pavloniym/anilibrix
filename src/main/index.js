import {app, ipcMain as ipc, Tray, nativeImage, Menu} from 'electron' // eslint-disable-line
import {MainWindow, TorrentWindow} from './windows'
import path from 'path'
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


const createTray = () => {

  // Get icon path
  const iconPath = path.join(__dirname, '../../build/icons/tray/icon.png');

  // Create tray with icon
  const tray = new Tray(nativeImage.createFromPath(iconPath));

};


app.on('ready', () => {
  createWindows();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (MainWindow.get() === null) {
    createWindows()
  }
});
