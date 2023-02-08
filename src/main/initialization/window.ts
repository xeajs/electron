import mitt from '@/share/mitt'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export function mountBrowserWindow() {
  // const icon = nativeImage.createFromPath($$.joinPathBasedOnThePublic('assets/favicon/icon.png'));

  mitt.on('main:createBrowserWindow', (path) => {
    const href = `http://localhost:${5173}${path}`
    const windowOptions: BrowserWindowConstructorOptions = {
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
    }
    const winInstance = new BrowserWindow(windowOptions)
    winInstance.loadURL(href)
  })
}
