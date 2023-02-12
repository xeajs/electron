import * as electron from 'electron'

electron.contextBridge.exposeInMainWorld('ipcRenderer', electron.ipcRenderer)
