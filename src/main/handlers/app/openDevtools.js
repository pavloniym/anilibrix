import {ipcMain} from "electron";

export const OPEN_DEVTOOLS = 'OPEN_DEVTOOLS';

export default ({browserWindow}) => ipcMain.handle(OPEN_DEVTOOLS, () => browserWindow.webContents.openDevTools())
