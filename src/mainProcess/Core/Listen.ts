import 'colors';

import Config from '~/config';
import Koa from 'koa';
import { ipcMain } from 'electron';
import os from 'os';

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

const OpenMainWindow = () => {
  const port = $$.isPro() ? Config.port : Config.port + 1;
  const href = `http://localhost:${port}`;
  ipcMain.emit('CreateBrowserWindow', { href });
};
export const Listen = async (app: Koa, callback?: Function) => {
  const localTitle = `- Local:   `.rainbow;
  const localInner = `http://localhost:${Config.port + Config.prefix}/`.blue;
  const networkTitle = `- Network: `.rainbow;
  const networkInner = `http://${GetIPAddress('IPv4')}:${Config.port + Config.prefix}/`.blue;
  app.listen(Config.port, () => {
    console.info(``);
    console.info(`serve running at:`.rainbow);
    console.info(localTitle + localInner);
    console.info(networkTitle + networkInner);
    OpenMainWindow();
    callback && typeof callback === 'function' && callback();
  });
};
