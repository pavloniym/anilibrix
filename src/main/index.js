// Main process
import path from 'path'
import {meta} from '@package'
import sentry from './utils/sentry'
import store, {setUserId, getStore} from '@store'
import {app, ipcMain as ipc} from 'electron'
import {Main, Torrent, Chromecast} from './utils/windows'

// Import tray and menu
import Tray from './utils/tray'
import Menu from './utils/menu'

// Create tray and menu controller
const trayController = new Tray();
const menuController = new Menu();

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
  sentry({store: getStore(), source: 'main'});

  // Create windows
  Main.createWindow({title: meta.name}).loadUrl();
  Torrent.createWindow({title: `${meta.name} Torrent`}).loadUrl();
  Chromecast.createWindow({title: `${meta.name} Chromecast Server`}).loadUrl();

  // Main window close event
  Main.getWindow().on('close', () => app.quit());

  // Create menu
  menuController
    .setWindows({main: Main, torrent: Torrent, chromecast: Chromecast})
    .setWindowsEvents()
    .init();


  // Create tray icon
  // Set data folder
  trayController
    .createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')})
    .setTooltip(meta.name);


  // Init windows communications
  communications.forEach(communication => {
    ipc.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });


  // Show about panel
  ipc.on('app:about', () => app.showAboutPanel());

  // Notification
  ipc.on('app:notification', (e, payload) => Main.sendToWindow('app:notification', payload));

  // Devtools
  ipc.on('app:devtools:main', () => Main.showDevTools());
  ipc.on('app:devtools:torrent', () => Torrent.showDevTools());
  ipc.on('app:devtools:chromecast', () => Chromecast.showDevTools());

  // Set dock number
  // If dock is available
  ipc.on('app:dock:number', (e, number) => {
    if(app.dock) {
      app.dock.setBadge(number && number > 0 ? number.toString() : '')
    }
  });

});
