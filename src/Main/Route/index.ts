import * as Public from '@/Main/Controller/Public';
import * as TodoList from '@/Main/Controller/TodoList';

import Router from 'koa-router';
import { SetApiPrefix } from '@/Main/Core';

export const Route = new Router();

Route.all('/', Public.Hello);
Route.get(SetApiPrefix('/todolist/delete'), TodoList.Delete);
Route.get(SetApiPrefix('/todolist/find'), TodoList.Find);
Route.post(SetApiPrefix('/todolist/add'), TodoList.Add);
Route.post(SetApiPrefix('/todolist/update'), TodoList.Update);

export default Route;
