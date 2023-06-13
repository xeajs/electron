/// <reference types="vite/client" />
import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    readonly ipcRenderer: IpcRenderer
  }
}

export declare module 'socket.io' {
  interface Socket {
    user: {}
    state: {}
  }
}

export {}
