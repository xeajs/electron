import { app } from 'electron';

require('~/global/CreateGlobal');
require('~/global/CreateBrowserWindow');
require('~/global/CreateGlobalShortcut');
require('~/global/OpenDirectory');

app.on('ready', function () {
  require('./Application');
});
