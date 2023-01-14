import {ipcRenderer} from 'electron'
import {CLOSE_WINDOW, RELOAD_WINDOW, MINIMIZE_WINDOW, MAXIMIZE_WINDOW} from '@main/handlers/window/controlWindowState'

export default {
    close: () => ipcRenderer.invoke(CLOSE_WINDOW),
    reload: () => ipcRenderer.invoke(RELOAD_WINDOW),
    minimize: () => ipcRenderer.invoke(MINIMIZE_WINDOW),
    maximize: () => ipcRenderer.invoke(MAXIMIZE_WINDOW),
}
