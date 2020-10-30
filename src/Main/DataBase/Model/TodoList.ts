import Core from '@/Main/DataBase/Core';

class TodoList extends Core {
  constructor() {
    super('todoList', $$.AppInfo.WorkDBPath);
  }
}

export default new TodoList();
