import mousetrap from 'mousetrap';
import { remote } from 'electron';

const HotKey = [
  {
    key: 'f5',
    active() {
      remote.getCurrentWindow().reload();
    }
  },
  {
    key: 'f12',
    active() {
      remote.getCurrentWebContents().toggleDevTools();
    }
  }
];

/** 在浏览器窗口内的快捷键 */
export const registerHotKey = () => {
  HotKey.forEach((item) => {
    mousetrap.bind(item.key, item.active);
  });
};
export const unregisterHotKey = () => {
  HotKey.forEach((item) => {
    mousetrap.unbind(item.key);
  });
};
