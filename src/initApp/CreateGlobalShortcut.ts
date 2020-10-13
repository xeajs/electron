import { BrowserWindow, app, globalShortcut } from 'electron';

const GlobalHotKey = [
  {
    key: 'ctrl+shift+i',
    active() {
      const browserWindow = BrowserWindow.getFocusedWindow();
      if (!browserWindow) return;
      browserWindow.webContents.toggleDevTools();
    }
  }
];

export const registerGlobalHotKey = () => {
  for (const hotKey of GlobalHotKey) {
    globalShortcut.register(hotKey.key, hotKey.active);
  }
};

export const unregisterGlobalHotKey = () => {
  globalShortcut.unregisterAll();
};

app.on('will-quit', () => {
  unregisterGlobalHotKey();
});

app.on('ready', () => {
  registerGlobalHotKey();
});
