/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-23 20:03:03
 * @Message 注入外部存储持久化目录 下的 logs $$.log
 */

import Config from '~/config';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

export const Log = (logPath) => {
  const isPro = () => process.env.NODE_ENV === 'production';
  const BaseClear = () => {
    const nowDate = Date.now();
    fs.readdir(logPath, (error, files) => {
      if (error) return;
      files.forEach((item) => {
        /** 时间戳越小，文件越老 */
        const filesTime = new Date(item.substring(0, 10)).getTime();
        /** N 天以前的时间戳 */
        const diffTime = dayjs(nowDate)
          .subtract(Config.plugins.logs.retainDate || 7, 'day')
          .toDate()
          .getTime();
        /** 超时日志文件清理 */
        if (filesTime < diffTime) {
          fs.unlink(path.join(logPath, item), () => {});
        }
      });
    });
  };
  BaseClear();
  const BaseTransfromConsole = (type: 'info' | 'error' | 'warn', message, ...logs: unknown[]) => {
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
    /**
     * from https://github.com/doowb/ansi-colors/blob/master/index.js
     */
    // eslint-disable-next-line no-control-regex
    const ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    return `${logString}\r\n`.replace(ANSI_REGEX, '');
  };

  const BaseSaveConsole = async (logString: string) => {
    const logTime = dayjs().format('YYYY-MM-DD');
    const fileName = `${logTime}.txt`;
    const filePath = path.join(logPath, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, logString, { encoding: 'utf-8' });
    } else {
      fs.appendFileSync(filePath, logString, { encoding: 'utf-8' });
    }
  };

  return {
    info: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('info', message, ...logs)))) || console.info,
    error: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('error', message, ...logs)))) || console.error,
    warn: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('warn', message, ...logs)))) || console.warn
  };
};
