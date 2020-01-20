const { app } = require('electron');
const { XeaCliViewService } = require('../xea.config');
const AppOptions = XeaCliViewService({ env: process.env.NODE_ENV });
const createWindow = require('./createWindow');
const { registerGlobalHotKey, unregisterGlobalHotKey } = require('./globalHotKey');

global.NodeListenPort = AppOptions.node.port;
global.BrowserWindowPort = process.env.NODE_ENV === 'development' ? AppOptions.devServer.port : AppOptions.node.port;
global.MainWindow = null;
class ElectronCore {
  constructor() {
    this.isReady = false;
    this.isServeDone = false;
    app.on('will-quit', () => {
      unregisterGlobalHotKey();
    });
    app.on('ready', () => {
      this.isReady = true;
      this.renderWindow();
      registerGlobalHotKey();
    });
    global.isServeDone = () => {
      this.isServeDone = true;
      this.renderWindow();
    };
  }
  async init() {}
  renderWindow() {
    if (this.isReady && this.isServeDone) {
      global.MainWindow = createWindow(BrowserWindowPort);
    }
  }
}
module.exports = new ElectronCore();
