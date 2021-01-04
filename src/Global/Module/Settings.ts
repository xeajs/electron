/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:57:09
 * @Message settings.json 默认值
 */
import { DefaultSettingJson, SettingJsonTypes } from '@/Global/settingJson';

import fs from 'fs';

export const readSetting = (): SettingJsonTypes => {
  const _path_ = $$.AppInfo.WorkSettingPath || '';
  const _config_ = { encoding: 'utf8' };
  try {
    return JSON.parse(fs.readFileSync(_path_, _config_));
  } catch (error) {
    return DefaultSettingJson;
  }
};
export const writeSetting = (settingInner?: Partial<SettingJsonTypes>): boolean => {
  settingInner = { ...readSetting(), ...(settingInner || {}) };
  /** 缺失字段，设置上默认值 */
  for (const item of Reflect.ownKeys(DefaultSettingJson)) {
    if (Reflect.toString.call(settingInner[item]) === '[object Undefined]') {
      settingInner[item] = DefaultSettingJson[item];
    }
  }
  /** 多余字段，删除 */
  for (const item of Reflect.ownKeys(settingInner)) {
    if (Reflect.toString.call(DefaultSettingJson[item]) === '[object Undefined]') {
      Reflect.deleteProperty(settingInner, item);
    }
  }

  const _path_ = $$.AppInfo.WorkSettingPath || '';
  const _config_ = { encoding: 'utf8' };

  try {
    fs.writeFileSync(_path_, JSON.stringify(settingInner, null, 4), _config_);
    return true;
  } catch (error) {
    return false;
  }
};
