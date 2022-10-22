import {contextBridge} from 'electron'

import showAppAbout from './app/showAppAbout'
import openDevtools from './app/openDevtools';
import openExternalURL from './app/openExternalURL'
import makeHttpRequest from './http/makeHttpRequest'
import toggleFullscreen from './window/toggleFullscreen'
import controlWindowState from "./window/controlWindowState"

contextBridge.exposeInMainWorld('electron', {
    platform: process.platform,
    showAppAbout: showAppAbout,
    openDevtools: openDevtools,
    openExternalURL: openExternalURL,
    makeHttpRequest: makeHttpRequest,
    toggleFullscreen: toggleFullscreen,
    controlWindowState: controlWindowState,
})
