// Main process
import path from 'path'
import {app} from 'electron'
import {meta} from '@package'
import sentry from './utils/sentry'

// Store
import {setUserId, getStore} from '@store'

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

// Torrent Handlers
import {broadcastTorrentEvents} from "@main/handlers/torrents/torrentsHandler";

// Import tray and menu
import Tray from './utils/tray'
import Menu from './utils/menu'
import {version} from "../../package";


// Create tray and menu controller
const trayController = new Tray();
const menuController = new Menu();

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

// Add command lines arguments
app.commandLine.appendSwitch('disable-site-isolation-trials');

// Close app on all windows closed (relevant for mac users)
app.on('window-all-closed', () => app.quit());

// App ready handler
app.on('ready', async () => {

  // Set user id
  await setUserId();

  // Initialize sentry.io
  sentry({store: getStore(), source: 'main'});

  // Create windows
  // Create main window
  // Set user agent
  // Main window close event
  Main.createWindow({title: meta.name}).loadUrl();
  Main.getWindow().webContents.userAgent = `${meta.name}/${version}`;
  Main.getWindow().on('close', () => app.quit());

  // Create torrent window
  Torrent.createWindow({title: `${meta.name} Torrent`}).loadUrl();
  Torrent.getWindow().webContents.userAgent = `${meta.name}/${version}`;

  // Create menu
  // Create tray icon
  menuController.setWindows(Main, Torrent).init();
  trayController.createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')}).setTooltip(meta.name);

  appHandlers(); // App handlers
  torrentHandlers(); // Torrent handler
  //downloadHandlers(); // Download handlers

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
 * Torrents handlers
 *
 * @return {void}
 */
const torrentHandlers = () => {
  broadcastTorrentEvents(); // broadcast all torrent events
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
