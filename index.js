/**
 * @See [https://www.electronjs.org/docs/tutorial/security#electron-安全警告]
 * */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
/** ================================================ */
const { dialog } = require('electron');
try {
  require('./dist/serve/index.js');
} catch (error) {
  console.error('[error]', error);
  dialog.showErrorBox('启动错误', error);
}
