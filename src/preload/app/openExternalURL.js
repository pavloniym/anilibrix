import {ipcRenderer} from "electron";
import {OPEN_EXTERNAL_URL} from "@handlers/app/openExternalURL";

export default (url) => ipcRenderer.invoke(OPEN_EXTERNAL_URL, url);
