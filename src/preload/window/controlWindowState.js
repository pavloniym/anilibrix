import {ipcRenderer} from 'electron'
import {CLOSE_WINDOW, MINIMIZE_WINDOW, MAXIMIZE_WINDOW} from '@handlers/window/controlWindowState'

export default {
    close: () => ipcRenderer.invoke(CLOSE_WINDOW),
    minimize: () => ipcRenderer.invoke(MINIMIZE_WINDOW),
    maximize: () => ipcRenderer.invoke(MAXIMIZE_WINDOW),
}
