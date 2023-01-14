import {ipcRenderer} from 'electron'
import {MAKE_HTTP_REQUEST} from '@main/handlers/http/makeHttpRequest'

export default async axiosConfiguration => await ipcRenderer.invoke(MAKE_HTTP_REQUEST, axiosConfiguration);
