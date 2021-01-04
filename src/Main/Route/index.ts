/**
 * @Message 根路由为前端部署访问地址，不可用作接口地址
 * @Error Route.all('/', ***);
 * @Success Route.all(SetApiPrefix('***'), ***);
 */

import * as Hello from '@/Main/Controller/Hello';
import * as Hello1 from '@/Main/Controller/Hello1';

import Router from 'koa-router';
import { SetApiPrefix } from '@/Main/Core';

const Route = new Router();

Route.all(SetApiPrefix('/hello'), Hello.AllHello);
Route.all(SetApiPrefix('/hello1'), Hello1.AllHello);

export default Route;
