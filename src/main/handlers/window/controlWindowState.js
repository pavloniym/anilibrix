import {app, BrowserWindow, ipcMain} from 'electron'

export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';

export default () => {
    ipcMain.handle(CLOSE_WINDOW, () => app.quit());
    ipcMain.handle(MINIMIZE_WINDOW, () => BrowserWindow.getFocusedWindow().minimize());
    ipcMain.handle(MAXIMIZE_WINDOW, () => BrowserWindow.getFocusedWindow().isMaximized() ? BrowserWindow.getFocusedWindow().unmaximize() : BrowserWindow.getFocusedWindow().maximize());
};
