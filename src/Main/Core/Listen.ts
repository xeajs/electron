import 'colors';

import Config from '~/config';
import ElectronBuilderConfig from '~/electron-builder-config';
import Koa from 'koa';
import { ipcMain } from 'electron';
import os from 'os';
import path from 'path';

export const GetIPAddress = (type: 'IPv4' | 'IPv6') => {
  const interfaces = os.networkInterfaces();
  let address = '127.0.0.1';
  for (const key in interfaces) {
    for (const item of interfaces[key]) {
      if (item.family === type && key === 'en0') {
        address = item.address;
        break;
      }
    }
  }
  return address;
};

const GetProcessPort = (): { Main: number; Render: number } => {
  return {
    Main: Config.port,
    Render: $$.isPro() ? Config.port : Config.port + 1
  };
};

const OpenMainWindow = () => {
  const href = `http://localhost:${GetProcessPort().Render}`;
  ipcMain.emit('CreateBrowserWindow', { href });
};
export const Listen = async (app: Koa, callback?: Function) => {
  app.listen(Config.port, () => {
    console.info(``);
    console.info(`serve running at:`.rainbow);
    console.info(`- Main Process Server: `.rainbow + `http://localhost:${GetProcessPort().Main + Config.prefix}/`.blue);
    console.info(`- Render Process Server: `.rainbow + `http://localhost:${GetProcessPort().Render}/`.blue);
    console.info(`- 外部存储目录: `.rainbow + `${path.resolve($$.AppInfo.WorkPath)}`.blue);
    console.info(`- appId: `.rainbow + `${ElectronBuilderConfig.appId}`.blue);
    OpenMainWindow();
    callback && typeof callback === 'function' && callback();
  });
};
