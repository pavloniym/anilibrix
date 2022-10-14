import {shell, ipcMain} from "electron";

export const OPEN_EXTERNAL_URL = 'OPEN_EXTERNAL_URL';

export default () => ipcMain.handle(OPEN_EXTERNAL_URL, (_, url) => shell.openExternal(url))
