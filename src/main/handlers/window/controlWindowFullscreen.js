import {ipcMain} from 'electron'

export const WATCH_FULLSCREEN = 'WATCH_FULLSCREEN';
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';

export default ({browserWindow}) => {
    ipcMain.handle(TOGGLE_FULLSCREEN, () => browserWindow.setFullScreen(!browserWindow.isFullScreen()))

    //ipcMain.on('watch-full-screen', e => browserWindow.webContents.send(WATCH_FULLSCREEN, e?.isFullscreen))
}
