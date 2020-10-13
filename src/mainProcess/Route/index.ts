import * as Hello from 'mainProcess/Controller/Hello';

import Router from 'koa-router';
import { SetApiPrefix } from 'mainProcess/Core';

export const Route = new Router();

Route.post(SetApiPrefix('/hello'), Hello.Post);
Route.get(SetApiPrefix('/hello'), Hello.Get);

export default Route;
