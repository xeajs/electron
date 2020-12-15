import Instalce from '@/Main/DataBase/Instalce';

class TodoListModel extends Instalce {
  constructor() {
    super('todoList', $$.AppInfo.WorkDBPath);
  }
}

const TodoList = new TodoListModel();
export { TodoList };
export default TodoList;
