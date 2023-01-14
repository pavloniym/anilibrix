import {ipcRenderer} from "electron";
import {OPEN_DEVTOOLS} from "@main/handlers/app/openDevtools";

export default () => ipcRenderer.invoke(OPEN_DEVTOOLS);
