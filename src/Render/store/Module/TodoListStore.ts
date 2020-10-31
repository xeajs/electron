import { action, observable, runInAction, toJS } from 'mobx';

import _Store from '@/Render/store';
import service from '@/Render/service/TodoList';

export interface TodoListItem {
  id: string;
  date: number;
  title: string;
  flag: boolean;
}

export default class {
  @observable public todoList: TodoListItem[];
  public constructor() {
    this.todoList = [];
    // this.getTodoList();
  }

  @action public getTodoList = async (params?: object) => {
    const { data } = await service.getTodoList(params);
    runInAction(() => {
      this.todoList = data.data;
    });
  };
  @action public deleteTodoList = async (id: string) => {
    const list = this.todoList.filter((item) => item.id !== id);
    runInAction(() => {
      this.todoList = list;
    });
  };
  @action public editorTodoList = async (newItem: TodoListItem) => {
    const list = toJS(this.todoList);
    list.splice(
      list.findIndex((item) => item.id === newItem.id),
      1,
      newItem
    );
    runInAction(() => {
      this.todoList = list;
    });
  };
  @action public addTodoList = async (item: { title: string; flag: boolean }) => {
    const data = {
      id: Math.floor(Math.random() * 10).toString(),
      date: Date.now(),
      title: item.title,
      flag: item.flag
    };
    runInAction(() => {
      this.todoList = [...this.todoList, data];
    });
  };
}
