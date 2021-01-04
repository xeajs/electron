/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:19:40
 */

import { readSetting, writeSetting } from '@/Global/Module/Settings';

import { Event } from '@/Global/Module/Event';
import ExternalStorage from '@/Global/Module/ExternalStorage';
import Logs from '@/Global/Module/Log';
import Package from '~/package.json';
import { dialog } from 'electron';
import path from 'path';

export default () => {
  const __ = {
    dialog,
    isPro: () => process.env.NODE_ENV === 'production',
    joinDirBasedOnTheCwd: (...dirOrPath: string[]) => path.join(process.cwd(), ...dirOrPath),
    joinPathBasedOnThePublic: (...dirOrPath: string[]) => {
      return path.join(__dirname, '../', `public/`, ...dirOrPath);
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
      WorkPath: ExternalStorage(),
      /** 数据库存储目录 */
      WorkDBPath: ExternalStorage({ path: 'db', type: 'dir' }),
      /** 日志信息存储目录 */
      WorkLogPath: ExternalStorage({ path: 'logs', type: 'dir' }),
      /** 软件定制化设置信息存储文件地址 */
      WorkSettingPath: ExternalStorage({ path: 'setting.json', type: 'file' })
    },
    Settings: {
      readSetting,
      writeSetting
    },
    Event,
    log: new Logs(ExternalStorage({ path: 'logs', type: 'dir' }))
  };

  Reflect.set(global, '$$', __);

  /** settings.json 写入默认值 */
  writeSetting();
};
