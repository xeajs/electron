/**
 * 配置书写规则
 * @SettingInfo 1、一维，扁平
 */

import _WorkPath from '../_WorkPath';
import defaultSettings from './setting';
import fs from 'fs';

const SettingGet = () => {
  const settingFilePath = _WorkPath('setting.json', true);
  if (settingFilePath && fs.existsSync(settingFilePath)) {
    try {
      const inner = fs.readFileSync(settingFilePath, { encoding: 'utf8' });
      return JSON.parse(inner);
    } catch (error) {
      return defaultSettings;
    }
  }
  return defaultSettings;
};
const SettingSet = (settingInner = {}) => {
  $$.log.info(`【Action】 update settings`);
  const settingFilePath = _WorkPath('setting.json', true);
  settingInner = Object.assign(SettingGet(), settingInner);
  /** 缺失字段，设置上默认值 */
  for (const item of Reflect.ownKeys(defaultSettings)) {
    if (Reflect.toString.call(settingInner[item]) === '[object Undefined]') {
      settingInner[item] = defaultSettings[item];
    }
  }
  /** 多余字段，删除 */
  for (const item of Reflect.ownKeys(settingInner)) {
    if (Reflect.toString.call(defaultSettings[item]) === '[object Undefined]') {
      Reflect.deleteProperty(settingInner, item);
    }
  }

  if (settingFilePath && fs.existsSync(settingFilePath)) {
    try {
      fs.writeFileSync(settingFilePath, JSON.stringify(settingInner, null, 2), { encoding: 'utf8' });
      return true;
    } catch (error) {
      console.error('更新配置文件失败，请检查');
      return false;
    }
  }
  fs.writeFileSync(settingFilePath, JSON.stringify(defaultSettings, null, 2), { encoding: 'utf8' });
  return true;
};

/** 初始化 setting.json */
SettingSet();

/** 挂载到全局 */
Reflect.set($$, 'Settings', {
  read: SettingGet,
  write: SettingSet
});
