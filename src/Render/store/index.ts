import GlobalStore from '@/Render/store/Module/GlobalStore';
import MediaDevicesStore from '@/Render/store/Module/MediaDevicesStore';
import SettingStore from '@/Render/store/Module/SettingStore';
import TodoListStore from '@/Render/store/Module/TodoListStore';

/** store 集中类型 */
export type StoreTypes = {
  Global: GlobalStore;
  TodoList: TodoListStore;
  MediaDevices: MediaDevicesStore;
  Setting: SettingStore;
};

/** 实例化 store */
const StoreInstance: StoreTypes = {
  Global: new GlobalStore(),
  TodoList: new TodoListStore(),
  MediaDevices: new MediaDevicesStore(),
  Setting: new SettingStore()
};

/** export Store */
export default StoreInstance;
