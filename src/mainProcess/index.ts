/**
 * The return value of this method indicates whether or not this instance of your
 * application successfully obtained the lock.  If it failed to obtain the lock,
 * you can assume that another instance of your application is already running with
 * the lock and exit immediately.
 *
 * I.e. This method returns `true` if your process is the primary instance of your
 * application and your app should continue loading.  It returns `false` if your
 * process should immediately quit as it has sent its parameters to another
 * instance that has already acquired the lock.
 *
 * On macOS, the system enforces single instance automatically when users try to
 * open a second instance of your app in Finder, and the `open-file` and `open-url`
 * events will be emitted for that. However when users start your app in command
 * line, the system's single instance mechanism will be bypassed, and you have to
 * use this method to ensure single instance.
 *
 * An example of activating the window of primary instance when a second instance
 * starts:
 */
/**
 * 此方法的返回值指示是否该实例
 * 应用程序成功获得了锁。 如果无法获得锁，
 * 您可以假设应用程序的另一个实例已经在运行
 * 锁立即退出。
 *
 * 也就是说，如果您的进程是
 * 应用程序和你的应用程序应该继续加载。如果
 * 进程应立即退出，因为它已将其参数发送给另一个进程
 * 已获取锁的实例。
 * 在macOS上，当用户尝试
 * 在Finder中打开应用程序的第二个实例，然后打开“open file”和“open url”`
 * 将为此发出事件。但是当用户在命令中启动应用程序时
 * 行，系统的单实例机制将被绕过，您必须
 * 使用此方法可确保单个实例。
 * 第二个实例时激活主实例窗口的示例
 * 开始时间：
 */

import { BrowserWindow, app } from 'electron';

import initApp from 'src/initApp';

/**
 *
 * @单例锁
 * @Boolean true  []
 * @Boolean false [可以假设应用程序的另一个实例已经在]
 */
const gotTheLock = app.requestSingleInstanceLock();

const wakeOrCreate = () => {
  initApp();
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
};

gotTheLock ? wakeOrCreate() : app.quit();
