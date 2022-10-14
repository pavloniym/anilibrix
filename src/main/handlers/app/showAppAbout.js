import {app, ipcMain} from "electron";

export const SHOW_APP_ABOUT = 'SHOW_APP_ABOUT';

export default () => ipcMain.handle(SHOW_APP_ABOUT, () => app.showAboutPanel())
