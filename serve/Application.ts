import Koa from 'koa';
import { Listen } from '@serve/Core/Listen';
import Middleware from '@serve/Middlewares/Middleware';
import Route from '@serve/Route';
import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import path from 'path';
import serveStatic from 'koa-static';

const app = new Koa();
Listen(app, () => require('@serve/Service'));
app.use(Middleware());
app.use(bodyparser());
app.use(compress());
app.use(Route.routes());
app.use(favicon($$.JoinDirWithRoot('favicon.ico')));
app.use(serveStatic(path.join(__dirname, '../views/')));
