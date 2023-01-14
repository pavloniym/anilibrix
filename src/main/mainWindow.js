import {applyHandlers} from './handlers/appHandlers'
import {app, BrowserWindow} from 'electron';

// Plugins
import windowStateKeeper from 'electron-window-state';

// Utils
const path = require('path');

async function createWindow() {

    // Initialize state keeper
    const stateKeeper = windowStateKeeper({defaultWidth: 1100, defaultHeight: 770});

    // Create browser window instance
    const browserWindow = new BrowserWindow({
        x: stateKeeper.x,
        y: stateKeeper.y,
        show: false,
        frame: false,
        width: stateKeeper.width,
        height: stateKeeper.height,
        minWidth: 730,
        minHeight: 770,
        darkTheme: true,
        titleBarStyle: 'hiddenInset',
        useContentSize: true,
        webPreferences: {
            sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
            preload: path.join(__dirname, '../preload/index.js'),
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
            autoplayPolicy: 'no-user-gesture-required',
            nodeIntegration: false,
            contextIsolation: true,
        },
        backgroundColor: '#121212',
    });

    /**
     * Wait until app is ready
     * Apply handlers to browser window
     * Should be right after window initialization (!)
     */
    app.whenReady().then(() => applyHandlers({browserWindow}))

    /**
     * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
     * it then defaults to 'true'. This can cause flickering as the window loads the html content,
     * and it also has show problematic behaviour with the closing of the window.
     * Use `show: false` and listen to the  `ready-to-show` event to show the window.
     *
     * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
     */
    browserWindow.on('ready-to-show', () => browserWindow?.show());

    /**
     * Use state keeper to save and restore browser window size and position
     *
     * @see https://github.com/mawie81/electron-window-state
     */
    stateKeeper.manage(browserWindow);

    /**
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test.
     */
    !app.isPackaged && process.env['ELECTRON_RENDERER_URL']
        ? await browserWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
        : await browserWindow.loadFile(path.join(__dirname, '../renderer/index.html'))


    // Return browser window instance
    return browserWindow;
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {

    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

    // Create new window
    // Restore if was minimized
    if (window === undefined) window = await createWindow();
    if (window.isMinimized()) window.restore();

    // Focus on window
    window.focus();
}
