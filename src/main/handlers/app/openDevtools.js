import {BrowserWindow, ipcMain} from "electron";

export const OPEN_DEVTOOLS = 'OPEN_DEVTOOLS';

export default () => ipcMain.handle(OPEN_DEVTOOLS, () => BrowserWindow.getFocusedWindow().webContents.openDevTools())
