import {app} from 'electron';
import {applyHandlers} from './handlers'
import {restoreOrCreateWindow} from './mainWindow';
//import './security-restrictions';

// Prevent electron from running multiple instances.
const isSingleInstance = app.requestSingleInstanceLock();

// Close app if seconds instance is initiated
if (!isSingleInstance) app.quit();
if (!isSingleInstance) process.exit(0);

// Restore first window
app.on('second-instance', restoreOrCreateWindow);

// Disable Hardware Acceleration to save more system resources.
app.disableHardwareAcceleration();

// Shout down background process if all windows was closed
// If now Mac
if (process.platform !== 'darwin') app.on('window-all-closed', () => app.quit());

// @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'
app.on('activate', restoreOrCreateWindow);

// Apply handlers
//Create the application window when the background process is ready.
app.whenReady().then(() => applyHandlers())
app.whenReady().then(restoreOrCreateWindow).catch(e => console.error('Failed create window:', e));


// Install Vue.js or any other extension in development mode only.
if (import.meta.env.DEV) {
 /*   app
        .whenReady()
        .then(() => import('electron-devtools-installer'))
        .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        }))
        .catch(e => console.error('Failed install extension:', e));*/
}

// Check for new version of the application - production mode only.
if (import.meta.env.PROD) {
    app
        .whenReady()
        .then(() => import('electron-updater'))
        .then(({autoUpdater}) => autoUpdater.checkForUpdatesAndNotify())
        .catch(e => console.error('Failed check updates:', e));
}


