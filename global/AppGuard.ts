import { app } from 'electron';
/**
 * @See https://www.electronjs.org/docs/tutorial/security#electron-安全警告
 */
Reflect.set(process.env, 'ELECTRON_DISABLE_SECURITY_WARNINGS', true);
/** ================================================ */

/**
 * @See https://github.com/nodejs/node/issues/4467
 * @Msg 某些版本中可能不存在
 */
process.on('uncaughtException', (err: Error) => {
  if (typeof console.error === 'function') {
    console.error((err || '').toString());
    console.error(err.stack || '');
  } else {
    console.log((err || '').toString());
    console.log(err.stack || '');
  }
});

/**
 * @Msg GPU进程崩溃
 */
app.on('gpu-process-crashed', (event: Event, killed: boolean) => {
  console.log('GPU进程崩溃');
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
