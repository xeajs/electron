/**
 * @Author yejiang1015
 * @Date 2020-12-18 12:27:00
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-18 16:50:01
 * @Pre {优先加载 日志模块}
 * @Message 订阅软件相关信息
 */

import { app } from 'electron';
/**
 * @See https://www.electronjs.org/docs/tutorial/security#electron-安全警告
 */
Reflect.set(process.env, 'ELECTRON_DISABLE_SECURITY_WARNINGS', true);
/** ================================================ */

/**
 * @See https://github.com/nodejs/node/issues/4467
 * @Msg 监听未捕获的异常
 * @Msg 某些版本中可能不存在
 */
process.on('uncaughtException', (err: Error) => {
  if ($$.log) {
    $$.log.error((err || '').toString());
    $$.log.error(err.stack || '');
  }
});

/**
 * @See https://github.com/nodejs/node/issues/4467
 * @Msg 监听Promise没有被捕获的失败函数
 */
process.on('unhandledRejection', (err: Error) => {
  if ($$.log) {
    $$.log.error((err || '').toString());
    $$.log.error(err.stack || '');
  }
});

/**
 * @Msg GPU进程崩溃
 */
app.on('gpu-process-crashed', (event: Event, killed: boolean) => {
  if ($$.log) {
    $$.log.error('GPU进程崩溃', killed, event);
  }
  app.exit(0);
});

/**
 * @Msg 当所有窗口被关闭了，退出
 * 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前，应用会保持活动状态
 */
app.on('window-all-closed', (...args) => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
