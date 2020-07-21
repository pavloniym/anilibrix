// Main process
import path from 'path'
import {app} from 'electron'
import {meta} from '@package'
import sentry from './utils/sentry'

// Store
import {setUserId, getStore} from '@store'

// Windows
import {Main, Torrent} from './utils/windows'

// App Handlers
// Torrent Handlers
// Download Handlers
// Notifications Handlers
import {broadcastAppHandlers} from '@main/handlers/app/appHandlers'
import {broadcastTorrentEvents} from "@main/handlers/torrents/torrentsHandler";
import {broadcastDownloadHandlers} from "@main/handlers/download/downloadHandlers";
import {broadcastNotificationsEvents} from "@main/handlers/notifications/notificationsHandler";

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
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-site-isolation-trials');

// Append proxy pac url if provided
if (process.env.PAC_PROXY_URL && process.env.PAC_PROXY_URL.length > 0) {
  app.commandLine.appendSwitch('proxy-pac-url', process.env.PAC_PROXY_URL);
}


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
  // Set user agent
  Torrent.createWindow({title: `${meta.name} Torrent`}).loadUrl();
  Torrent.getWindow().webContents.userAgent = `${meta.name}/${version}`;

  // Create menu
  // Create tray icon
  menuController.setWindows(Main, Torrent).init();
  trayController.createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')}).setTooltip(meta.name);

  // Broadcast all handlers
  // Used for windows communications
  broadcastAppHandlers();
  broadcastTorrentEvents();
  broadcastDownloadHandlers();
  broadcastNotificationsEvents();

});


/*
/!**
 * Download handlers
 * Start download, cancel and open file
 *
 * @return {void}
 *!/
const downloadHandlers = () => {

  // Create storage
  const storage = {};

  // Handlers
  startingDownload(storage, Main); // Start download
  cancelingDownload(storage); // Cancel download
  openingDownload(storage); // Open downloaded file
};*/
