import * as Events from 'events';
import * as fs from 'fs';
import * as path from 'path';

import moment from 'moment';

export default async () => {
  /** defineProperty */
  Reflect.defineProperty(global, 'speakinInstanceGlobalObject', {
    value: {}
  });
  Reflect.defineProperty(global, 'SPK', {
    value: speakinInstanceGlobalObject
  });

  /** 默认最大函数数量为10 设置为 100 */
  const eventEmitter = new Events();
  eventEmitter.setMaxListeners(100);
  SPK.EventEmitter = eventEmitter;

  SPK.AppWorkInfo = function() {
    const InstallPath = path.join(process.cwd(), 'Temp');
    const StoragePath = path.join(process.cwd(), 'Temp');
    const StoragePathByLog = path.join(StoragePath, 'log');
    const StoragePathBySettings = path.join(StoragePath, 'settings.json');
    return {
      InstallPath,
      StoragePath,
      StoragePathByLog,
      StoragePathBySettings
    };
  };

  SPK.SetGlobal = function(propertyKey, propertyValue) {
    if (typeof propertyKey !== 'string') {
      throw new Error(`setGlobal params propertyKey = ${propertyKey}`);
    }
    return Reflect.set(speakinInstanceGlobalObject, propertyKey, propertyValue);
  };

  SPK.GetGlobal = function() {
    return Reflect.get(global, 'speakinInstanceGlobalObject');
  };

  SPK.GetSettings = function() {
    return SPK.GetGlobal().settings;
  };

  SPK.SetSettings = function(settings) {
    /** 1、 更新global */
    if (!settings || !Reflect.ownKeys(settings).length) {
      return false;
    }
    const newSettings = { ...SPK.GetSettings(), ...settings };
    if (!SPK.SetGlobal('settings', newSettings)) {
      return false;
    }
    /** SPK.EventEmitter 实列提示 settings 更新 */
    SPK.EventEmitter.emit('globalSettingsUpdateStatus', { settings: newSettings });
    return true;
  };

  SPK.Log = function(type, docs, filePath) {
    const name = moment().format('YYYY-MM-DD');
    let logFile = path.join(SPK.AppWorkInfo().StoragePathByLog, `${name}.txt`);
    if (filePath) {
      logFile = filePath;
    }
    if (!fs.existsSync(SPK.AppWorkInfo().StoragePathByLog)) {
      fs.mkdirSync(SPK.AppWorkInfo().StoragePathByLog);
    }
    if (!fs.existsSync(logFile)) {
      try {
        fs.writeFileSync(logFile, '', { encoding: 'utf8' });
      } catch (error) {}
    }
    let logInner = '';
    logInner += `*** [${name}] ***     `;
    logInner += `*** [${type}] ***     `;
    logInner += `*** [${docs}] ***     \r\n`;
    try {
      fs.appendFile(logFile, logInner.toString(), { encoding: 'utf8' }, (err) => {});
    } catch (error) {}
  };
};
