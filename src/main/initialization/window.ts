import { BrowserWindow } from 'electron'

export function mountBrowserWindow() {
  // const icon = nativeImage.createFromPath($$.joinPathBasedOnThePublic('assets/favicon/icon.png'));

  const _BrowserWindow = new BrowserWindow({
    center: true,
    title: 'XeaJS ECS',
    show: true,
    width: 960,
    height: 640,
    minWidth: 960,
    minHeight: 640,
    frame: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  })

  _BrowserWindow.loadURL('http://localhost:5173/')
}
