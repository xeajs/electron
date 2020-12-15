/**
 * @Message 根路由为前端部署访问地址，不可用作接口地址
 * @Error Route.all('/', ***);
 * @Success Route.all(SetApiPrefix('***'), ***);
 */

import * as Hello from '@/Main/Controller/Hello';
import * as TodoList from '@/Main/Controller/TodoList';

import Router from 'koa-router';
import { SetApiPrefix } from '@/Main/Core';

const Route = new Router();

Route.all(SetApiPrefix('/hello'), Hello.AllHello);
Route.get(SetApiPrefix('/todolist/delete'), TodoList.Delete);
Route.get(SetApiPrefix('/todolist/find'), TodoList.Find);
Route.post(SetApiPrefix('/todolist/add'), TodoList.Add);
Route.post(SetApiPrefix('/todolist/update'), TodoList.Update);

export default Route;
