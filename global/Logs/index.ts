import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

export default (isPro, logPath) => {
  const BaseTransfromConsole = (type: 'log' | 'error' | 'warn', message, ...logs: unknown[]) => {
    const logTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let logString = `${logTime} 【${type}】`;
    const _logs = [message, ...logs];
    for (const item of _logs) {
      switch (Reflect.toString.call(item)) {
        case '[object String]':
          logString += ` ***** ${item}`;
          break;
        case '[object Number]':
        case '[object Boolean]':
          logString += ` ***** ${String(item)}`;
          break;
        case '[object Object]':
        case '[object Array]':
          logString += ` ***** ${JSON.stringify(item, null, 0)}`;
          break;
        default:
          logString += ` ***** ${item}`;
          break;
      }
    }
    return `${logString} \r\n`;
  };

  const BaseSaveConsole = async (logString: string) => {
    const logTime = dayjs().format('YYYY-MM-DD');
    const fileName = `${logTime}-${typeof window === undefined || typeof window === 'undefined' ? 'serve' : 'views'}.txt`;
    const filePath = path.join(logPath, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, logString, { encoding: 'utf8' });
    } else {
      fs.appendFileSync(filePath, logString, { encoding: 'utf8' });
    }
  };

  return {
    log: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('log', message, ...logs)))) || console.log,
    error: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('error', message, ...logs)))) || console.log,
    warn: (isPro && ((message, ...logs) => BaseSaveConsole(BaseTransfromConsole('warn', message, ...logs)))) || console.log
  };
};
