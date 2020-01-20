const { BrowserWindow, app, dialog, nativeImage } = require('electron');
const pkg = require('../package.json');

module.exports = (port) => {
  const win = new BrowserWindow({
    center: true,
    title: pkg.name,
    icon: nativeImage.createFromPath('./favicon.ico'),
    show: true,
    backgroundColor: '#f0f0f0',
    minWidth: 1040,
    minHeight: 768,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });
  win.webContents.on('crashed', (event) => {
    dialog.showMessageBox(win, {
      type: 'error',
      buttons: ['重启'],
      title: '错误',
      message: '发生意外错误，请点击按钮重启系统',
      defaultId: 0,
      cancelId: 1
    });
    event.preventDefault();
    app.quit();
  });
  win.loadURL(`http://localhost:${port}`);
  return win;
};
