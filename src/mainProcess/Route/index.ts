import * as Hello from 'mainProcess/Controller/Hello';
import * as TodoList from 'mainProcess/Controller/TodoList';

import Router from 'koa-router';
import { SetApiPrefix } from 'mainProcess/Core';

export const Route = new Router();

Route.post(SetApiPrefix('/hello'), Hello.Post);
Route.get(SetApiPrefix('/hello'), Hello.Get);

Route.get(SetApiPrefix('/todolist/delete'), TodoList.Delete);
Route.get(SetApiPrefix('/todolist/find'), TodoList.Find);
Route.post(SetApiPrefix('/todolist/add'), TodoList.Add);
Route.post(SetApiPrefix('/todolist/update'), TodoList.Update);

export default Route;
