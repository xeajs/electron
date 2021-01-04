/**
 * @Author yejiang1015
 * @Date 2020-12-18 11:51:06
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:03:30
 * @Message 初始化外部存储持久化目录
 */

import { app, dialog } from 'electron';

import Config from '~/config';
import { __mkdirSync } from '../libs';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * @Message 获取持久化到磁盘的目录
 * @Note 按照规则自动匹配，有则使用，无则创建
 */

export function diskPath(): string {
  let diskDir = '';
  switch (process.platform) {
    /**
     * @Win32 系统下获取存储磁盘
     * @优先级： D：E：F：。。。C：
     */
    case 'win32':
      (() => {
        let stdout = execSync('wmic logicaldisk where drivetype=3 get deviceid').toString();
        stdout = stdout.replace('DeviceID', '');
        const driveletter = stdout.match(/[A-Z]:/g) || [];
        /**
         * @C盘排序最后
         */
        const cIndex = driveletter.findIndex((f) => f === 'C:');
        if (cIndex > -1) {
          driveletter.push(driveletter.splice(cIndex, 1).join());
        }
        /**
         * @D盘排序最前
         */
        const dIndex = driveletter.findIndex((f) => f === 'D:');
        if (dIndex > -1) {
          driveletter.unshift(driveletter.splice(dIndex, 1).join());
        }
        for (let index = 0; index < driveletter.length; index++) {
          try {
            /** @权限检测 同步地测试用户对 path 指定的文件或目录的权限 */
            const __dir__ = driveletter[index];
            fs.accessSync(__dir__);
            diskDir = __dir__;
            break;
          } catch (error) {
            continue;
          }
        }
      })();
      break;
    case 'darwin':
      diskDir = app.getPath('home');
      break;
  }

  if (!diskDir) {
    dialog.showErrorBox('异常通知', '当前电脑无可用磁盘，或没有磁盘访问权限，请联系管理员！');
  }
  return diskDir;
}

/** @Message 获取目录, 如果目录不存在，则创建 */
type APPDIR = 'logs' | 'db' | 'setting.json';

interface InitExternalStorage {
  path: APPDIR;
  type: 'file' | 'dir';
}
export default function (pathObject?: InitExternalStorage): string {
  const __path__ = path.join(diskPath(), Config.plugins.diskPath, pathObject ? pathObject.path : '');
  if (pathObject?.type === 'dir') {
    return fs.existsSync(__path__) ? __path__ : __mkdirSync(__path__);
  }
  if (pathObject?.type === 'file') {
    if (fs.existsSync(__path__)) {
      return __path__;
    }
    if (__mkdirSync(path.dirname(__path__))) {
      fs.writeFileSync(__path__, Buffer.from([0]), { encoding: 'utf8' });
    }
    return __path__;
  }
  return fs.existsSync(__path__) ? __path__ : __mkdirSync(__path__);
}
