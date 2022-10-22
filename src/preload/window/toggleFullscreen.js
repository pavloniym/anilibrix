import {ipcRenderer} from "electron";
import {TOGGLE_FULLSCREEN} from "@handlers/window/toggleFullscreen";

export default () => ipcRenderer.invoke(TOGGLE_FULLSCREEN);
