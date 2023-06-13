import { BrowserWindow } from 'electron'
import path from 'node:path'
import { renderPort } from 'src/share/port'

export function createBrowserWindow(nowShow?: boolean) {
  // const icon = nativeImage.createFromPath($$.joinPathBasedOnThePublic('assets/favicon/icon.png'));

  const winInstance = new BrowserWindow({
    center: true,
    title: 'xea-electron',
    show: false,
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
  })

  winInstance.loadURL(`http://localhost:${renderPort}`)
  winInstance.on('ready-to-show', winInstance.show)
  if (nowShow) winInstance.show()
}
