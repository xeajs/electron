/// <reference types="vite/client" />
import Electron from 'electron'

declare global {
  interface Window {
    readonly ipcRenderer: Electron.IpcRenderer
  }
}

export {}
