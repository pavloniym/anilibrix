// Main process
import path from 'path'
import sentry from './utils/sentry'
import store, {setUserId} from '@store'
import {app, ipcMain as ipc} from 'electron'

import Tray from './utils/tray'
import Menu from './utils/menu'
import {Main, Torrent, Chromecast} from './utils/windows'


// Communications between windows
const communications = [

  // Torrent Channels
  {channel: 'torrent:clear', window: () => Main},
  {channel: 'torrent:error', window: () => Main},
  {channel: 'torrent:start', window: () => Torrent},
  {channel: 'torrent:server', window: () => Main},
  {channel: 'torrent:destroy', window: () => Torrent},
  {channel: 'torrent:download', window: () => Main},

  // Chromecast channels
  {channel: 'chromecast:play', window: () => Chromecast}, // play on chromecast device
  {channel: 'chromecast:devices:items', window: () => Main}, // send found devices from chromecast server to main app window
  {channel: 'chromecast:devices:request', window: () => Chromecast}, // make request for devices items to chromecast server,

];


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') // eslint-disable-line
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line


app.on('window-all-closed', () => app.quit());
app.on('ready', async () => {

  // Set user id
  await setUserId();

  // Initialize sentry.io
  sentry({store, source: 'main'});


  // Create windows
  Main.createWindow({title: 'Aniibrix'}).loadUrl();
  Torrent.createWindow({title: 'Aniibrix Torrent'}).loadUrl();
  Chromecast.createWindow({title: 'AniLibrix Chromecast Server'}).loadUrl();


  // Create menu
  new Menu()
    .setWindows({main: Main, torrent: Torrent, chromecast: Chromecast})
    .setWindowsEvents()
    .init();


  // Create tray icon
  // Set data folder
  new Tray()
    .createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')})
    .setTooltip('AniLibrix');


  // Init windows communications
  communications.forEach(communication => {
    ipc.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });

});
