import { app, dialog } from 'electron';

import Config from '~/config';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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
  case 'linux':
    AppRootWorkPath = app.getPath('home');
    break;
  default:
    AppRootWorkPath = '';
    dialog.showErrorBox('错误', '请联系管理员，当前不支持存储');
}

/** 同步递归创建文件夹, 返回文件夹目录 */
export const MkdirSync = (dirName) => {
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

type APPDIR = 'logs' | 'db' | 'setting.json';

/** 获取目录, 如果目录不存在，则创建 */
export default (type?: APPDIR, isFile = false) => {
  const _path = path.join(AppRootWorkPath, Config.diskPath, type ? type : '');
  if (!isFile) {
    return fs.existsSync(_path) ? _path : MkdirSync(_path);
  } else {
    return fs.existsSync(path.dirname(_path)) ? _path : MkdirSync(path.dirname(_path)) && _path;
  }
};
