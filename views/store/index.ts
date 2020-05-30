import GlobalStore from './Module/GlobalStore';
import TodoListStore from './Module/TodoListStore';
export { GlobalStore };
export { TodoListStore };

export default {
  globalStore: new GlobalStore(),
  todoListStore: new TodoListStore()
};
