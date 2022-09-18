// Main process
import path from 'path'
import {app} from 'electron'
import {autoUpdater} from 'electron-updater'
import {meta, version} from '@package'

// Utils
import {openWindowInterceptor} from '@main/utils/windows/openWindowInterceptor'
import {initializeSentryInterceptor} from '@main/utils/sentry/appSentry'

// Store
import {setUserId, getStore} from '@store'

// Windows
import {Main, Torrent} from './utils/windows'

// Handlers
import {broadcastTorrentEvents} from '@main/handlers/torrents/torrentsHandler';
import {catchPowerSaveSleepIsAllowedEvent, catchPowerSaveSleepIsRestrictedEvent} from '@main/handlers/system/powerSaveHandler'
import {catchAppAboutEvent, catchAppDockNumberEvent, catchAppDevtoolsMainEvent, catchAppDevtoolsTorrentEvent} from '@main/handlers/app/appHandlers'

// Import tray and menu
import Tray from './utils/tray'
import Menu from './utils/menu'

// Remote
require('@electron/remote/main').initialize()

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
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Close app on all windows closed (relevant for mac users)
app.on('window-all-closed', () => app.quit());

app.on('web-contents-created', (event, webContents) => {
    webContents.setWindowOpenHandler(openWindowInterceptor)
    webContents.setUserAgent(`${meta.name}/${version}`)
    webContents.on('will-attach-webview', (event, webPreferences, params) => {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload

        // Disable Node.js integration
        webPreferences.nodeIntegration = false

        // Enable sandbox
        webPreferences.contextIsolation = true
    })
})

// App ready handler
app.on('ready', async () => {

    // Set user id
    await setUserId();

    // Initialize sentry.io
    initializeSentryInterceptor({store: getStore(), source: 'main'});

    // Create windows
    Main.createWindow({title: meta.name}).loadUrl();
    Torrent.createWindow({title: `${meta.name} Torrent`}).loadUrl();

    const mainWindow = Main.getWindow()
    const torrentWindow = Torrent.getWindow()

    require('@electron/remote/main').enable(mainWindow.webContents);
    require('@electron/remote/main').enable(torrentWindow.webContents);

    mainWindow
        .on('close', () => app.quit()) // Main window close event
        .once('ready-to-show', () => mainWindow.show()) // Show main window
        .once('ready-to-show', () => autoUpdater.checkForUpdatesAndNotify()); // Auto-update

    // Create menu
    menuController
        .setWindows(mainWindow, torrentWindow)
        .init();

    // Create tray icon
    trayController
        .createTrayIcon({iconPath: path.join(__dirname, '../../build/icons/tray/icon.png')})
        .setTooltip(meta.name);

    // Events
    catchAppAboutEvent(); // About dialog
    broadcastTorrentEvents(); // broadcast all torrent events
    catchAppDockNumberEvent(); // App dock number event
    catchAppDevtoolsMainEvent(); // Devtools main
    catchAppDevtoolsTorrentEvent(); // Devtools torrent
    catchPowerSaveSleepIsAllowedEvent(); // Enable system sleep
    catchPowerSaveSleepIsRestrictedEvent(); // Disable system sleep

});
