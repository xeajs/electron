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

import { app, BrowserWindow } from 'electron'
import { mount } from './mount'

export async function initialization() {
  return await new Promise((resolve) => {
    /**
     * @单例锁
     * @Boolean true  []
     * @Boolean false [可以假设应用程序的另一个实例已经在]
     */
    const TheSingleInstanceLock = app.requestSingleInstanceLock()

    if (!TheSingleInstanceLock) {
      /**
       * @启用单例
       * 多实例启动时，退出当前启动，唤起已经存在的实例
       */
      app.quit()
    } else {
      mount()
      /**
       * 当运行第二个实例时,将会聚焦到 {browserWindow} 这个窗口
       * 唤醒已启动的单例 {browserWindow}
       */
      app.on('second-instance', () => {
        const browserWindow: BrowserWindow | null = Reflect.get(global, 'CreateBrowserWindow') || null
        if (!browserWindow) return
        if (browserWindow.isMinimized()) browserWindow.restore()
        browserWindow.focus()
      })
      app.on('ready', function () {
        resolve(null)
      })
    }
  })
}
