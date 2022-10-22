import {BrowserWindow, ipcMain} from 'electron'

export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';

export default () => ipcMain.handle(TOGGLE_FULLSCREEN, () => BrowserWindow.getFocusedWindow().setFullScreen(!BrowserWindow.getFocusedWindow().isFullScreen()))
