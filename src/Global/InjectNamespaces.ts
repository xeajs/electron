/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-18 18:55:49
 */

import { readSetting, writeSetting } from './__DefaultSettings';

import { Event } from './_Event';
import { Log } from './_Logs';
import Package from '~/package.json';
import _ExternalStorage from './_ExternalStorage';
import { dialog } from 'electron';
import path from 'path';

const __ = {
  dialog,
  isPro: () => process.env.NODE_ENV === 'production',
  joinDirBasedOnTheCwd: (...dirOrPath: string[]) => path.join(process.cwd(), ...dirOrPath),
  joinPathBasedOnThePublic: (...dirOrPath: string[]) => {
    return path.join(__.joinDirBasedOnTheCwd(), __.isPro() ? `public/` : `resources/app.asar.unpacked/public/`, ...dirOrPath);
  },
  AppInfo: {
    platform: process.platform,
    versions: {
      ...process.versions,
      appVersion: Package.version.split('-')[0],
      /** 开发环境为 undefined， 生产环境为 CI 打包的 {打包号} */
      build: Package.version.split('-')[1]
    },
    /** 软件外部存储根目录 */
    WorkPath: _ExternalStorage(),
    /** 数据库存储目录 */
    WorkDBPath: _ExternalStorage({ path: 'db', type: 'dir' }),
    /** 日志信息存储目录 */
    WorkLogPath: _ExternalStorage({ path: 'logs', type: 'dir' }),
    /** 软件定制化设置信息存储文件地址 */
    WorkSettingPath: _ExternalStorage({ path: 'setting.json', type: 'file' })
  },
  Settings: {
    readSetting,
    writeSetting
  },
  Event,
  log: Log(_ExternalStorage({ path: 'logs', type: 'dir' }))
};

Reflect.set(global, '$$', __);

/** settings.json 写入默认值 */
writeSetting();
