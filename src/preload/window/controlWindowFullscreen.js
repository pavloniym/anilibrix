import {ipcRenderer} from "electron";
import {TOGGLE_FULLSCREEN, WATCH_FULLSCREEN} from "@main/handlers/window/controlWindowFullscreen";

export default {
    watch: callback => ipcRenderer.on(WATCH_FULLSCREEN, (e, isFullscreen) => callback(isFullscreen)),
    toggle: _ => ipcRenderer.invoke(TOGGLE_FULLSCREEN),
};
