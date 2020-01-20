import _SPK from './SPK';
import utils from './utils';
export default async (): Promise<void> => {
  /** 初始化 SPK 全局挂载 */
  await _SPK();
  /** 在 SPK 上挂载 settings 文件内容 */
  SPK.SetSettings(utils.readSettingFile());
  /** 监听配置变更同时更新到本地文件 */
  SPK.EventEmitter.on('globalSettingsUpdateStatus', ({ settings }) => {
    utils.writeSettingFile(settings);
  });
};
