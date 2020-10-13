import Core from 'mainProcess/DataBase/Core';

class TodoList extends Core {
  constructor() {
    super('todoList', $$.AppInfo.WorkDBPath);
  }
}

export default new TodoList();
