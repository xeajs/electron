import GlobalStore from './Module/GlobalStore';
import TodoListStore from './Module/TodoListStore';
import UserMediaDevices from './Module/UserMediaDevices';
export { GlobalStore };
export { TodoListStore };
export { UserMediaDevices };

export default {
  globalStore: new GlobalStore(),
  todoListStore: new TodoListStore(),
  userMediaDevices: new UserMediaDevices()
};
