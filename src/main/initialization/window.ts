import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'node:path'
import mitt from 'src/share/mitt'
import { renderPort } from 'src/share/port'

export function mountBrowserWindow() {
  // const icon = nativeImage.createFromPath($$.joinPathBasedOnThePublic('assets/favicon/icon.png'));

  mitt.on('main:createBrowserWindow', (href) => {
    const windowOptions: BrowserWindowConstructorOptions = {
      center: true,
      title: 'xeaup',
      show: true,
      width: 960,
      height: 640,
      minWidth: 960,
      minHeight: 640,
      frame: true,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        devTools: true,
        webSecurity: true,
        preload: path.resolve(__dirname, '../preload/index.js'),
        nodeIntegration: true,
        contextIsolation: true,
      },
    }
    const winInstance = new BrowserWindow(windowOptions)
    setTimeout(() => {
      winInstance.loadURL(`http://localhost:${renderPort}${href}`)
      if (env.NODE_ENV === 'development') winInstance.webContents.openDevTools()
    }, 1800)
  })
}
