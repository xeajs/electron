const { dialog } = require('electron');
const path = require('path');
try {
  require(path.join(process.cwd(), 'dist/serve/index.js'));
} catch (error) {
  console.error(error);
  dialog.showErrorBox('启动错误', error);
}
