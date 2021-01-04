/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:55:26
 * @Message 注入外部存储持久化目录 下的 logs $$.log
 */

import Config from '~/config';
import dayjs from 'dayjs';
import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';

type ConsoleType = 'info' | 'error' | 'warn';

export default class Console {
  private logDir: string;

  private ANSI_REGEX: RegExp;

  constructor(logDir: string) {
    if (!logDir || !fs.existsSync(logDir)) {
      dialog.showErrorBox('系统异常', '日志目录不存在。请检查!');
      throw new Error('日志目录不存在。请检查!');
    }
    this.logDir = logDir;
    /**
     * from https://github.com/doowb/ansi-colors/blob/master/index.js
     */
    // eslint-disable-next-line no-control-regex
    this.ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    this.clear();
  }
  /** 持久化日志到本地 */
  private storage(logText: string) {
    const logTime = dayjs().format('YYYY-MM-DD');
    const fileName = `${logTime}.txt`;
    const options: fs.WriteFileOptions = { encoding: 'utf8' };
    const filePath = path.join(this.logDir, fileName);
    fs[!fs.existsSync(filePath) ? 'writeFileSync' : 'appendFileSync'](filePath, logText, options);
  }
  /** 清理过期日志文件 */
  private clear() {
    const nowDate = Date.now();
    fs.readdir(this.logDir, (error, files) => {
      if (error) {
        this.error('清理过期日志文件异常', error);
        return;
      }
      files.forEach((item) => {
        /** 时间戳越小，文件越老 */
        const filesTime = new Date(item.substring(0, 10)).getTime();
        /** N 天以前的时间戳 */
        const diffTime = dayjs(nowDate)
          .subtract(Config.plugins.logs.retainDate || 7, 'day')
          .toDate()
          .getTime();
        /** 过期日志文件清理 */
        if (filesTime < diffTime) {
          fs.unlink(path.join(this.logDir, item), (error) => {
            this.error('清理过期日志文件异常', error);
          });
        }
      });
    });
  }
  /** 格式化日志内容 */
  private fomat(type: ConsoleType, message, ...logs: any[]) {
    const logTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let logString = `${logTime} 【${type}】`;
    const _logs = [message, ...logs];
    for (const item of _logs) {
      switch (Reflect.toString.call(item)) {
        case '[object String]':
          logString += `,${item}`;
          break;
        case '[object Number]':
        case '[object Boolean]':
          logString += `,${String(item)}`;
          break;
        case '[object Object]':
        case '[object Array]':
          logString += `,${JSON.stringify(item, null, 0)}`;
          break;
        default:
          logString += `,${item}`;
          break;
      }
    }
    return `${logString}\r\n`.replace(this.ANSI_REGEX, '');
  }
  public info(message, ...logs) {
    this.storage(this.fomat('info', message, ...logs));
  }
  public error(message, ...logs) {
    this.storage(this.fomat('error', message, ...logs));
  }
  public warn(message, ...logs) {
    this.storage(this.fomat('warn', message, ...logs));
  }
}
