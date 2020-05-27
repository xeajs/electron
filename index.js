const { dialog } = require('electron');
try {
  require('./dist/serve/index.js');
} catch (error) {
  console.error('[error]', error);
  dialog.showErrorBox('启动错误', error);
}
