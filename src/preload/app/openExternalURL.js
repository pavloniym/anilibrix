import {ipcRenderer} from "electron";
import {OPEN_EXTERNAL_URL} from "@main/handlers/app/openExternalUrl";

export default (url) => ipcRenderer.invoke(OPEN_EXTERNAL_URL, url);
