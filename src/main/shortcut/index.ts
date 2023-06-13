import { BrowserWindow, app, dialog, globalShortcut } from 'electron'

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})

globalShortcut.register('CommandOrControl+Shift+p', function () {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (!focusedWindow) return
  dialog.showMessageBox(focusedWindow, { message: 'GlobalShortcut' })
})
