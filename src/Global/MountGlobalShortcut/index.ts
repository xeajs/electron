/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:42:43
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:24:19
 * @Message 全局快捷键
 */

import { app, globalShortcut } from 'electron';

const GlobalHotKey: { key: string; active: () => void }[] = [];

export const registerGlobalHotKey = () => {
  for (const hotKey of GlobalHotKey) {
    globalShortcut.register(hotKey.key, hotKey.active);
  }
};

export const unregisterGlobalHotKey = () => {
  globalShortcut.unregisterAll();
};

export default () => {
  app.on('will-quit', () => {
    unregisterGlobalHotKey();
  });

  app.on('ready', () => {
    registerGlobalHotKey();
  });
};
