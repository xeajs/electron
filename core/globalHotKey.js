const { globalShortcut } = require('electron');

const GlobalHotKey = [
  {
    key: 'CommandOrControl+R',
    active() {
      console.log('全局快捷键');
    }
  }
];

module.exports.registerGlobalHotKey = () => {
  GlobalHotKey.forEach((item) => {
    globalShortcut.register(item.key, item.active);
  });
};
module.exports.unregisterGlobalHotKey = () => {
  globalShortcut.unregisterAll();
};
