import { BrowserWindow, ipcMain, nativeImage } from 'electron';

import Config from '~/config';
const pkg = require('~/package.json');
const isPro = process.env.NODE_ENV === 'production';

export const create = function (port: number): BrowserWindow {
  const href = `http://localhost:${port}/`;
  const browserWindow = new BrowserWindow({ ...pkg.window, icon: nativeImage.createFromPath('/favicon.ico') });
  browserWindow.loadURL(href);
  return browserWindow;
};

ipcMain.once('openWindow', () => {
  const port = isPro ? Config.port : Config.port + 1;
  Reflect.set(global, 'MainWindow', create(port));
});
