import { app, dialog } from 'electron';

import $$Console from '~/global/Logs';
import Event from '~/global/Event';
import { SettingTypes } from '~/types/settings';
import defaultSetting from '~/global/Settings';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const Config = require('~/config');

/** 同步递归创建文件夹, 返回文件夹目录 */
const MkdirSync = (dirName) => {
  if (!dirName) throw new Error('目录不合法');
  if (fs.existsSync(dirName)) {
    return dirName;
  } else {
    if (MkdirSync(path.dirname(dirName))) {
      fs.mkdirSync(dirName);
      return dirName;
    }
  }
};

/** 设置基准存储磁盘位置 */
let AppRootWorkPath = '';
switch (process.platform) {
  case 'win32':
    (() => {
      /**
       * windows 系统下获取存储磁盘
       * 优先级： D：E：F：。。。C：
       */
      let stdout = execSync('wmic logicaldisk where drivetype=3 get deviceid').toString();
      stdout = stdout.replace('DeviceID', '');
      const driveletter = stdout.match(/[A-Z]:/g) || [];
      /** C盘排序最后 */
      const cIndex = driveletter.findIndex((f) => f === 'C:');
      if (cIndex > -1) {
        driveletter.push(driveletter.splice(cIndex, 1).join());
      }
      /** D盘排序最前 */
      const dIndex = driveletter.findIndex((f) => f === 'D:');
      if (dIndex > -1) {
        driveletter.unshift(driveletter.splice(dIndex, 1).join());
      }
      for (let index = 0; index < driveletter.length; index++) {
        try {
          fs.accessSync(driveletter[index]);
        } catch (error) {
          continue;
        }
        return (AppRootWorkPath = driveletter[index]);
      }
      throw new Error('无可用磁盘');
    })();
    break;
  case 'darwin':
    AppRootWorkPath = app.getPath('home');
    break;
  default:
    AppRootWorkPath = '';
    dialog.showErrorBox('错误', '请联系管理员，当前不支持存储');
}

const WorkPath = () => {
  const _path = path.join(AppRootWorkPath, Config.diskPath);
  return MkdirSync(_path);
};
const WorkLogPath = () => {
  return MkdirSync(path.join(WorkPath(), 'logs'));
};
const WorkDBPath = () => {
  return MkdirSync(path.join(WorkPath(), 'db'));
};
const WorkSettingPath = () => {
  const _path = path.join(WorkPath(), 'setting.json');
  Settings.writeFile({}, _path);
  return _path;
};

const Settings = {
  readFile: (path?: string): SettingTypes => {
    path = path || $$.AppInfo.WorkSettingPath;
    let _setting = defaultSetting;
    try {
      const inner = fs.readFileSync(path, { encoding: 'utf8' });
      _setting = JSON.parse(inner);
    } catch (error) {
      /**  */
    }
    return _setting;
  },
  writeFile: (settingInner: Partial<SettingTypes>, path?: string): boolean => {
    path = path || $$.AppInfo.WorkSettingPath;
    settingInner = Object.assign(Settings.readFile(path) || {}, settingInner);
    /** 缺失字段，设置上默认值 */
    for (const item of Reflect.ownKeys(defaultSetting)) {
      if (Reflect.toString.call(settingInner[item]) === '[object Undefined]') {
        settingInner[item] = defaultSetting[item];
      }
    }
    /** 多余字段，删除 */
    for (const item of Reflect.ownKeys(settingInner)) {
      if (Reflect.toString.call(defaultSetting[item]) === '[object Undefined]') {
        Reflect.deleteProperty(settingInner, item);
      }
    }
    try {
      fs.writeFileSync(path, JSON.stringify(settingInner, null, 2), { encoding: 'utf8' });
      return true;
    } catch (error) {
      console.error('更新配置文件失败，请检查');
      return false;
    }
  }
};

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
    WorkPath: WorkPath(),
    /** 日志信息存储目录 */
    WorkLogPath: WorkLogPath(),
    /** 数据库存储目录 */
    WorkDBPath: WorkDBPath(),
    /** 软件定制化设置信息存储文件地址 */
    WorkSettingPath: WorkSettingPath()
  },
  Settings,
  Event,
  console: $$Console(true, WorkLogPath())
});
