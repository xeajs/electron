import { BrowserWindow, app } from 'electron';

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  require('~/global/CreateGlobal');
  require('~/global/CreateBrowserWindow');
  require('~/global/CreateGlobalShortcut');
  require('~/global/OpenDirectory');
  app.on('second-instance', () => {
    /**
     * 当运行第二个实例时,将会聚焦到 {browserWindow} 这个窗口
     * 唤醒已启动的单例 {browserWindow}
     */
    const browserWindow: BrowserWindow | null = Reflect.get(global, 'MainWindow') || null;
    if (browserWindow) {
      if (browserWindow.isMinimized()) browserWindow.restore();
      browserWindow.focus();
    }
  });
  app.on('ready', function () {
    require('./Application');
  });
}
