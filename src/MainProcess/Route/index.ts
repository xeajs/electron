import * as Hello from 'MainProcess/Controller/Hello';

import Router from 'koa-router';
import { SetApiPrefix } from 'MainProcess/Core';

export const Route = new Router();

Route.post(SetApiPrefix('/hello'), Hello.Post);
Route.get(SetApiPrefix('/hello'), Hello.Get);

export default Route;
