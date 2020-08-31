import GlobalStore from './Module/GlobalStore';
import SettingStore from './Module/SettingStore';
import TodoListStore from './Module/TodoListStore';
import UserMediaDevices from './Module/UserMediaDevices';

export { GlobalStore, SettingStore, TodoListStore, UserMediaDevices };

export default {
  globalStore: new GlobalStore(),
  todoListStore: new TodoListStore(),
  userMediaDevices: new UserMediaDevices(),
  settingStore: new SettingStore()
};
