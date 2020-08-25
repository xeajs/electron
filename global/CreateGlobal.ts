import { app, dialog } from 'electron';

import path from 'path';

Reflect.set(global, '$$', {
  name: 'Hello Wrod',
  isPro: () => process.env.NODE_ENV === 'production',
  JoinDirWithRoot: (...dir) => {
    return path.join(process.cwd(), ...dir);
  },
  isString: (arg) => {
    return Reflect.toString.call(arg) === '[object String]';
  },
  isNumber: (arg) => {
    return Reflect.toString.call(arg) === '[object Number]';
  },
  isObject: (arg) => {
    return Reflect.toString.call(arg) === '[object Object]';
  },
  isUndefined: (arg) => {
    return Reflect.toString.call(arg) === '[object Undefined]';
  },
  isNull: (arg) => {
    return Reflect.toString.call(arg) === '[object Null]';
  },
  isFunction: (arg) => {
    return Reflect.toString.call(arg) === '[object Function]';
  },
  isPromise: (arg) => {
    return Reflect.toString.call(arg) === '[object Promise]';
  },
  isArray: (arg) => {
    return Reflect.toString.call(arg) === '[object Array]';
  },
  isBoolean: (arg) => {
    return Reflect.toString.call(arg) === '[object Boolean]';
  },
  /** 判断数值是否为有限 即除了正常的数值为true，其余诸如NaN, Infinity, '15'都为false */
  isFinite: (arg) => {
    return Number.isFinite(arg);
  },
  isNaN: (arg) => {
    return Number.isNaN(arg);
  },
  dialog: dialog,
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
