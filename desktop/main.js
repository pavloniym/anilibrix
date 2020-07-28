'use strict';

// Electron staff
import {app, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'

// Windows
import AppWindow from "./windows/AppWindow";

// Utils
import {meta, version} from './../package'
import devtoolsInstaller from "./utils/devtools/devtoolsInstaller";

// Check if in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);

// Create app window instance
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let AppWindowInstance = new AppWindow();


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
  AppWindowInstance.getWindow().on('close', () => app.quit())


  /* // Set user id
   await setUserId();

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
   broadcastAppHandlers();
   broadcastTorrentEvents();
   broadcastDownloadHandlers();
   broadcastNotificationsEvents();
 */

  //await autoUpdater.checkForUpdatesAndNotify();

});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
