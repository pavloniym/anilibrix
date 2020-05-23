import path from 'path'
import store from '@store'; // eslint-disable-line
import sentry from './utils/sentry'
import AppTray from './utils/tray'
import {app, ipcMain as ipc} from 'electron'
import {AppWindowMain, AppWindowTorrent, AppWindowChromecast} from './utils/windows'

// Enable Sentry.io electron handler
sentry({store, source: 'main'});

// Create tray icon
const appTray = new AppTray();

// Set windows communications
const communications = [

  // Torrent Channels
  {channel: 'torrent:clear', window: () => AppWindowMain},
  {channel: 'torrent:error', window: () => AppWindowMain},
  {channel: 'torrent:start', window: () => AppWindowTorrent},
  {channel: 'torrent:server', window: () => AppWindowMain},
  {channel: 'torrent:destroy', window: () => AppWindowTorrent},
  {channel: 'torrent:download', window: () => AppWindowMain},

  // Chromecast channels
  {channel: 'chromecast:play', window: () => AppWindowChromecast}, // play on chromecast device
  {channel: 'chromecast:devices:items', window: () => AppWindowMain}, // send found devices from chromecast server to main app window
  {channel: 'chromecast:devices:request', window: () => AppWindowChromecast}, // make request for devices items to chromecast server,

];


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

app.on('window-all-closed', () => app.quit())
app.on('ready', () => {

  // Create windows
  AppWindowMain.createWindow({title: 'Aniibrix'}).loadUrl();
  AppWindowTorrent.createWindow({title: 'Aniibrix Torrent'}).loadUrl();
  AppWindowChromecast.createWindow({title: 'AniLibrix Chromecast Server'}).loadUrl();


  // Create tray icon
  // Set data folder
  appTray
    .createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')})
    .setTooltip('AniLibrix')
    .setClickEvent(() => {

      // Restore window if it is minimized
      if (AppWindowMain.getWindow().isMinimized()) AppWindowMain.getWindow().restore();

      // Focus on window
      AppWindowMain.getWindow().focus();

    });


  // Init windows communications
  communications.forEach(communication => {
    ipc.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });


  // Open devtools
  ipc.on('devtools', () => {
    AppWindowMain.getWindow().webContents.openDevTools();
    AppWindowTorrent.getWindow().webContents.openDevTools();
    AppWindowChromecast.getWindow().webContents.openDevTools();
  });

});
