import GlobalStore from '@/Render/store/Module/GlobalStore';
import MediaDevicesStore from '@/Render/store/Module/MediaDevicesStore';
import SettingStore from '@/Render/store/Module/SettingStore';
import TodoListStore from '@/Render/store/Module/TodoListStore';

export default {
  Global: new GlobalStore(),
  TodoList: new TodoListStore(),
  MediaDevices: new MediaDevicesStore(),
  Setting: new SettingStore()
};
