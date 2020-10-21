'use strict';

// Electron staff
import {app, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'

// Windows
import AppWindow from "./windows/AppWindow";
import TorrentsWindow from "./windows/TorrentsWindow";

// Utils
import {meta, version} from './../package'
import devtoolsInstaller from "./utils/devtools/devtoolsInstaller";

// Resolvers
import AppResolver from "@@/utils/resolvers/app";
import RequestResolver from "@@/utils/resolvers/request";
import TorrentsResolver from "@@/utils/resolvers/torrents";
import NotificationsResolver from "@@/utils/resolvers/notifications";

const fs = require('fs');

// Check if in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);

// Create app window instance
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let AppWindowInstance = new AppWindow();
let TorrentsWindowInstance = new TorrentsWindow();


// Close app on all windows closed (relevant for mac users)
app.on('window-all-closed', () => app.quit());

// App ready handler
app.on('ready', async () => {

  // Try to install devtools
  // Only on development
  await devtoolsInstaller(isDevelopment);

  // Create protocol
  // On production version
  if (!process.env.WEBPACK_DEV_SERVER_URL) createProtocol('app');

  // Create app window
  // Set user agent
  // Process app window close event
  AppWindowInstance.createWindow({title: meta.name}).loadURL('', 'index.html');
  AppWindowInstance.getWindow().webContents.userAgent = `${meta.name}/${version}`;
  AppWindowInstance.getWindow().on('close', () => app.quit());

  // Create torrent window
  // Set user agent
  TorrentsWindowInstance.createWindow({title: `${meta.name} — Torrent Master`}).loadURL('torrents', 'torrents.html');
  TorrentsWindowInstance.getWindow().webContents.userAgent = `${meta.name}/${version}`;

  AppWindowInstance.showDevTools();
  TorrentsWindowInstance.showDevTools();

  // Resolvers
  appResolvers();
  torrentsResolvers();
  notificationsResolvers();

  // Functions
  globalFunctions();

  /*

   // Initialize sentry.io
   sentry({store: getStore(), source: 'main'});


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
   broadcastDownloadHandlers();
 */

});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  process.platform === 'win32'
    ? process.on('message', (data) => data === 'graceful-exit' ? app.quit() : null)
    : process.on('SIGTERM', () => app.quit())
}


/**
 * App Resolvers
 *
 * @return {void}
 */
const appResolvers = () => {
  AppResolver.showAbout();
  AppResolver.showAppDevtools(AppWindowInstance);
  AppResolver.showTorrentDevtools(TorrentsWindowInstance);
  AppResolver.resolveBroadcastEvent([AppWindowInstance, TorrentsWindowInstance]);
};


/**
 * Get global functions
 *
 * @return {void}
 */
const globalFunctions = () => {
  global.getFileContent = filepath => fs.existsSync(filepath) ? fs.readFileSync(filepath) : null;
  global.resolveDesktopRequest = RequestResolver.resolveDesktopRequest;
};


/**
 * Torrents Resolvers
 *
 * @return {void}
 */
const torrentsResolvers = () => {
  TorrentsResolver.resolveTorrentsWindowEvent(TorrentsWindowInstance);
};


/**
 * Notifications Resolvers
 *
 * @return {void}
 */
const notificationsResolvers = () => {
  NotificationsResolver.setDockNumber();
};
