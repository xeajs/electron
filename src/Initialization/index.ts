/**
 * @Message 初始化项目配置
 * @Msg 基于 require 同步导入，可控制导入顺序
 */

Reflect.set(global, '$$', {});

export default () => {
  /** $$.AppInfo 且 初始化公共函数 */
  require('./AppInfo');

  /** $$.log 且 初始化 日志存储文件目录 */
  require('./Log');

  /** $$.Settings 且 初始化 setting.json */
  require('./Settings');

  /** $$.Event */
  require('./Event');

  /** 绑定热键 */
  require('./CreateGlobalShortcut');

  /** 订阅窗口创建 */
  require('./CreateBrowserWindow');

  /** other */
  require('./AppGuard');
};
