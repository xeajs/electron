import * as fs from 'fs';

import systemSettings from '~/config/settings';

class Utils {
  public writeSettingFile(settings?: SettingsType): SettingsType {
    const { StoragePath, StoragePathBySettings } = SPK.AppWorkInfo();
    if (!settings) {
      settings = systemSettings;
    }
    if (!fs.existsSync(StoragePath)) {
      fs.mkdirSync(StoragePath);
    }
    try {
      fs.writeFileSync(StoragePathBySettings, JSON.stringify(settings, null, 4));
    } catch (error) {
      throw new Error(error);
    }
    return settings;
  }

  public readSettingFile(): SettingsType {
    const { StoragePathBySettings } = SPK.AppWorkInfo();
    if (!fs.existsSync(StoragePathBySettings)) {
      return systemSettings;
    }
    let settingInnerString = JSON.stringify('{}');
    try {
      settingInnerString = fs.readFileSync(StoragePathBySettings, { encoding: 'utf8' });
      /** 兼容本地添加新字段 */
      const newSettings = Object.assign({}, systemSettings, JSON.parse(settingInnerString));
      this.writeSettingFile(newSettings);
      settingInnerString = JSON.stringify(newSettings);
    } catch (error) {
      console.error('读取文件失败 path = ', StoragePathBySettings);
      throw new Error(error);
    }
    return JSON.parse(settingInnerString);
  }
}

export default new Utils();
