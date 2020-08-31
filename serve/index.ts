import { BrowserWindow, app } from 'electron';

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  require('~/global/AppGuard');
  require('~/global/CreateGlobal');
  require('~/global/CreateBrowserWindow');
  require('~/global/CreateGlobalShortcut');
  /**
   * 当运行第二个实例时,将会聚焦到 {browserWindow} 这个窗口
   * 唤醒已启动的单例 {browserWindow}
   */
  app.on('second-instance', () => {
    const browserWindow: BrowserWindow | null = Reflect.get(global, 'CreateBrowserWindow') || null;
    if (!browserWindow) return;
    if (browserWindow.isMinimized()) browserWindow.restore();
    browserWindow.focus();
  });
  app.on('ready', function () {
    require('./DataBase/index');
    require('./Application');
  });
}
