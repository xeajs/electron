/**
 * @Author yejiang1015
 * @Date 2020-12-18 13:01:31
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-18 19:12:25
 * @Message Electron 初始化及配置入口
 * @Message 基于 require 同步导入，可控制导入顺序
 */
import Config from '~/config';

export default () => {
  /** 初始化命名空间、外部存储持久化目录 {root|root/logs|root/db|root/settings} */
  require('./InjectNamespaces');

  /** 订阅窗口创建 */
  require('./CreateBrowserWindow');

  /** 崩溃报警 */
  require('./CreateGuard');

  /** HotUpdater */
  if (Config.hotUpdater) {
    require('./InjectAutoUpdate');
  }

  /** 绑定全局快捷键 */
  require('./CreateGlobalShortcut');

  /** 绑定软件快捷键 */
  require('./CreateMenuShortcut');
};
