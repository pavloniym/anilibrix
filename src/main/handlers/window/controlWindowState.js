import {app, ipcMain} from 'electron'

export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const RELOAD_WINDOW = 'RELOAD_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';

export default ({browserWindow}) => {
    ipcMain.handle(CLOSE_WINDOW, () => app.quit());
    ipcMain.handle(RELOAD_WINDOW, () => browserWindow.reload());
    ipcMain.handle(MINIMIZE_WINDOW, () => browserWindow.minimize());
    ipcMain.handle(MAXIMIZE_WINDOW, () => browserWindow.isMaximized() ? browserWindow.unmaximize() : browserWindow.maximize());
};
