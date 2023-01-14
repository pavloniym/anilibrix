import {contextBridge} from 'electron'

import showAppAbout from './app/showAppAbout'
import openDevtools from './app/openDevtools';
import openExternalURL from './app/openExternalURL'
import makeHttpRequest from './http/makeHttpRequest'
import controlWindowState from './window/controlWindowState'
import controlWindowFullscreen from './window/controlWindowFullscreen'

contextBridge.exposeInMainWorld('electron', {
    platform: process.platform,
    showAppAbout: showAppAbout,
    openDevtools: openDevtools,
    openExternalURL: openExternalURL,
    makeHttpRequest: makeHttpRequest,
    controlWindowState: controlWindowState,
    controlWindowFullscreen: controlWindowFullscreen,
})
