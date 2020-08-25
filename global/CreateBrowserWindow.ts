import { BrowserWindow, IpcMainEvent, dialog, ipcMain, nativeImage } from 'electron';
const pkg = require('~/package.json');

ipcMain.once('CreateBrowserWindow', (event: IpcMainEvent & { href: string }) => {
  if (!event.href || typeof event.href !== 'string') {
    dialog.showErrorBox('创建新窗口错误', `新窗口地址不合法、 ${event.href}`);
    return;
  }
  const NewBrowserWindowOptions = { ...pkg.window, icon: nativeImage.createFromPath('/favicon.ico') };
  const _BrowserWindow = new BrowserWindow(NewBrowserWindowOptions);
  _BrowserWindow.loadURL(event.href);
  Reflect.set(global, 'CreateBrowserWindow', _BrowserWindow);
});
