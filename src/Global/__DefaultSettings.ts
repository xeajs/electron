/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:57:26
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-18 19:05:23
 * @Message settings.json 默认值
 */
import fs from 'fs';

/** ============================ 默认 settings 配置 ============================ */
export const DefaultSetting = {
  ...process.versions
};
export type SettingTypes = typeof DefaultSetting;
/** ============================ 默认 settings 配置 ============================ */

export const readSetting = (): SettingTypes => {
  const _path_ = $$.AppInfo.WorkSettingPath || '';
  const _config_ = { encoding: 'utf8' };
  try {
    return JSON.parse(fs.readFileSync(_path_, _config_));
  } catch (error) {
    return DefaultSetting;
  }
};
export const writeSetting = (settingInner?: Partial<SettingTypes>): boolean => {
  settingInner = { ...readSetting(), ...(settingInner || {}) };
  /** 缺失字段，设置上默认值 */
  for (const item of Reflect.ownKeys(DefaultSetting)) {
    if (Reflect.toString.call(settingInner[item]) === '[object Undefined]') {
      settingInner[item] = DefaultSetting[item];
    }
  }
  /** 多余字段，删除 */
  for (const item of Reflect.ownKeys(settingInner)) {
    if (Reflect.toString.call(DefaultSetting[item]) === '[object Undefined]') {
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
