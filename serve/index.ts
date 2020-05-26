// import { BrowserWindow, app, dialog, globalShortcut, nativeImage } from 'electron';
// /** 主窗口实例 */
// let MainWindow: BrowserWindow | null = null;
// /**
//  * app.on('ready', todo); 回调调用
//  * @param {*} href
//  */
// const openWindow = (href = 'http://localhost:9090/') => {
//   const MainWindow = new BrowserWindow({
//     center: true,
//     title: '',
//     icon: nativeImage.createFromPath('./favicon.ico'),
//     show: true,
//     backgroundColor: '#f0f0f0',
//     minWidth: 1040,
//     minHeight: 768,
//     frame: true,
//     webPreferences: {
//       webSecurity: false,
//       nodeIntegration: true
//     }
//   });
//   MainWindow.loadURL(href);
//   return MainWindow;
// };

// /**
//  * 快捷键
//  */
// const GlobalHotKey = [
//   {
//     key: 'f12',
//     active() {
//       if (!MainWindow) return;
//       dialog.showMessageBox(MainWindow, { message: 'asdfasdf' });
//       MainWindow.webContents.openDevTools();
//     }
//   }
// ];
// const registerGlobalHotKey = () => {
//   GlobalHotKey.forEach((item) => {
//     globalShortcut.register(item.key, item.active);
//   });
// };
// const unregisterGlobalHotKey = () => {
//   globalShortcut.unregisterAll();
// };

// app.on('will-quit', () => {
//   unregisterGlobalHotKey();
// });
// app.on('ready', () => {
//   MainWindow = openWindow();
//   registerGlobalHotKey();
// });

const { BrowserWindow, nativeImage, app } = require('electron');
const openWindow = (href = 'http://localhost:9090/') => {
  const MainWindow = new BrowserWindow({
    center: true,
    title: '',
    icon: nativeImage.createFromPath('./favicon.ico'),
    show: true,
    backgroundColor: '#f0f0f0',
    minWidth: 1040,
    minHeight: 768,
    frame: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  MainWindow.loadURL(href);
  return MainWindow;
};

app.on('ready', () => {
  openWindow();
});
