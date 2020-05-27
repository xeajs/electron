import { app } from 'electron';

require('~/global/CreateBrowserWindow');
require('~/global/CreateGlobalShortcut');

app.on('ready', function () {
  require('./Application');
});
