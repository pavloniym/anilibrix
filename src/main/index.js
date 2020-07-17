// Main process
import path from 'path'
import {meta} from '@package'
import sentry from './utils/sentry'
import {app, ipcMain as ipc} from 'electron'

// Store
import store, {setUserId, getStore} from '@store'

// Windows
import {Main, Torrent} from './utils/windows'

// Download handlers
import {startingDownload, cancelingDownload, openingDownload} from "@main/handlers/download/downloadHandlers";

// App Handlers
import {
  catchAppAboutEvent,
  catchAppDevtoolsMainEvent,
  catchAppDevtoolsTorrentEvent,
  catchAppDockNumberEvent
} from '@main/handlers/app/appHandlers'

// Import tray and menu
import Tray from './utils/tray'
import Menu from './utils/menu'
import {catchReleaseNotification} from "@main/handlers/notifications/notificationsHandler";

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

];


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

app.commandLine.appendSwitch('disable-site-isolation-trials');

app.on('window-all-closed', () => app.quit());
app.on('ready', async () => {

  // Set user id
  await setUserId();

  // Initialize sentry.io
  sentry({store: getStore(), source: 'main'});

  // Create windows
  Main.createWindow({title: meta.name}).loadUrl();
  Torrent.createWindow({title: `${meta.name} Torrent`}).loadUrl();

  // Main window close event
  Main.getWindow().on('close', () => app.quit());

  // Create menu
  menuController.setWindows(Main, Torrent).init();

  // Create tray icon
  // Set data folder
  trayController.createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')}).setTooltip(meta.name);


  // Init windows communications
  communications.forEach(communication => {
    ipc.on(communication.channel, (e, payload) =>
      communication.window().sendToWindow(communication.channel, payload)
    )
  });


  appHandlers(); // App handlers
  downloadHandlers(); // Download handlers

});


/**
 * App handlers
 * Show about handlers
 *
 * @return {void}
 */
const appHandlers = () => {
  catchAppAboutEvent(); // about dialog
  catchAppDockNumberEvent(); // app dock number event
  catchAppDevtoolsMainEvent(); // devtools main
  catchAppDevtoolsTorrentEvent(); //devtools torrent
};


/**
 * Download handlers
 * Start download, cancel and open file
 *
 * @return {void}
 */
const downloadHandlers = () => {

  // Create storage
  const storage = {};

  // Handlers
  startingDownload(storage, Main); // Start download
  cancelingDownload(storage); // Cancel download
  openingDownload(storage); // Open downloaded file
};
