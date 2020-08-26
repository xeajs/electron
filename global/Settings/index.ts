/**
 * 配置书写规则
 * @SettingInfo 1、一维，扁平
 */
export type SettingTypes = {
  devTools: boolean;
  gitee: string;
};
const defaultSetting: SettingTypes = {
  devTools: false,
  gitee: 'https://gitee.com/xieyejiang/electron'
};

let localSetting = { default: {} };
try {
  localSetting = require('./index.local.ts');
} catch (error) {
  localSetting = { default: {} };
}

export default Object.assign(defaultSetting, localSetting.default);
