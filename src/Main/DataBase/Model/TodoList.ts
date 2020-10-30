import Instalce from '@/Main/DataBase/Instalce';

class TodoListModel extends Instalce {
  constructor() {
    super('todoList', $$.AppInfo.WorkDBPath);
  }
}

export const TodoList = new TodoListModel();
export default TodoList;
