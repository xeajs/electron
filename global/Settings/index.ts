/**
 * 配置书写规则
 * @SettingInfo 1、一维，扁平
 */
import { SettingTypes } from '~/types/settings';
import fs from 'fs';
import path from 'path';
const defaultSettings = require('~/global/Settings/setting.json');

let localSetting = {};
const localPath = path.join(process.cwd(), 'global/Settings/setting.local.json');
if (fs.existsSync(localPath)) {
  try {
    localSetting = JSON.parse(fs.readFileSync(localPath, { encoding: 'utf8' }));
  } catch (error) {
    /** */
  }
}

export default { ...defaultSettings, ...localSetting } as SettingTypes;
