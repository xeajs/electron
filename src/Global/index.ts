/**
 * @Author yejiang1015
 * @Date 2020-12-18 13:01:31
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2021-01-04 16:26:32
 * @Message Electron 初始化及配置入口
 * @Message 基于 require 同步导入，可控制导入顺序
 */

import ModuleAutoUpdater from './ModuleAutoUpdater';
import MountBrowserWindow from './MountBrowserWindow';
import MountGlobalShortcut from './MountGlobalShortcut';
import MountGuard from './MountGuard';
import MountMenuShortcut from './MountMenuShortcut';
import MountNamespace from './MountNamespace';

export default async () => {
  /** @挂载命名空间 {$$} */
  await MountNamespace();

  /** @订阅窗口创建 */
  await MountBrowserWindow();

  /** 崩溃报警 */
  await MountGuard();

  /** @绑定全局快捷键 */
  await MountGlobalShortcut();

  /** @绑定{软件|菜单}快捷键 */
  await MountMenuShortcut();

  /** HotUpdater */
  await ModuleAutoUpdater();
};
