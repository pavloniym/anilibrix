import {join} from 'path';
import {app, BrowserWindow} from 'electron';

async function createWindow() {

    const browserWindow = new BrowserWindow({
        show: false,
        frame: false,
        darkTheme: true,
        titleBarStyle: 'hiddenInset',
        useContentSize: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
            webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
            //preload: join(app.getAppPath(), 'out/preload/index.js'),
            preload: join(__dirname, '../preload/index.js'),
            autoplayPolicy: 'no-user-gesture-required',
            enableRemoteModule: true,
        },
        backgroundColor: '#121212',
    });

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
     * URL for main window.
     * Vite dev server for development.
     * `file://../renderer/index.html` for production and test.
     */

    !app.isPackaged && process.env['ELECTRON_RENDERER_URL']
        ? await browserWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
        : await browserWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

    return browserWindow;
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

    if (window === undefined) {
        window = await createWindow();
    }

    if (window.isMinimized()) {
        window.restore();
    }

    window.focus();
}