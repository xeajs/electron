import { app } from 'electron';
import path from 'path';

Reflect.set(global, 'ROOT', {
  name: 'Hello Wrod',
  ShortTime: {},
  AppInfo: {
    platform: process.platform,
    version: process.versions.electron,
    nodeVersion: process.versions.node,
    chromeVersion: process.versions.chrome,
    /** 软件外部存储根目录 */
    WorkPath: app.getPath('userData'),
    /** 日志信息存储目录 */
    WorkLogPath: path.join(app.getPath('userData'), 'logs'),
    /** 数据库存储目录 */
    WorkDBPath: path.join(app.getPath('userData'), 'dataBase'),
    /** 软件定制化设置信息存储文件地址 */
    WorkSettingPath: path.join(app.getPath('userData'), 'setting.json')
  },
  $log: (docs: Error | string, type?: 'log' | 'info' | 'warn' | 'error', path?: string): void => {}
});
