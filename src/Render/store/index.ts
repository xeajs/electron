import GlobalStore from '@/Render/store/Module/GlobalStore';
import SettingStore from '@/Render/store/Module/SettingStore';
import TodoListStore from '@/Render/store/Module/TodoListStore';

export default {
  Global: new GlobalStore(),
  TodoList: new TodoListStore(),
  Setting: new SettingStore()
};
