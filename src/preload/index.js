import {contextBridge} from 'electron'

import makeHttpRequest from './http/makeHttpRequest'
import controlWindowState from "./window/controlWindowState";

contextBridge.exposeInMainWorld('electron', {
    platform: process.platform,
    makeHttpRequest: makeHttpRequest,
    controlWindowState: controlWindowState,
})
