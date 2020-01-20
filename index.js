const { dialog } = require('electron');
const core = require('./core');
core.init().then(() => {
  try {
    require('./dist/serve/index.js');
  } catch (error) {
    dialog.showErrorBox(error);
  }
});
