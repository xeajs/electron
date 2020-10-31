import * as Public from '@/Main/Controller/Public';
import * as TodoList from '@/Main/Controller/TodoList';

import Router from 'koa-router';
import { SetApiPrefix } from '@/Main/Core';

export const Route = new Router();

/** 更路由为前端部署访问地址，不可用作 接口地址 Route.all('/', async () => {}); */
Route.all(SetApiPrefix('/hello'), Public.Hello);
Route.get(SetApiPrefix('/todolist/delete'), TodoList.Delete);
Route.get(SetApiPrefix('/todolist/find'), TodoList.Find);
Route.post(SetApiPrefix('/todolist/add'), TodoList.Add);
Route.post(SetApiPrefix('/todolist/update'), TodoList.Update);

export default Route;
