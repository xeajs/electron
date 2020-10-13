import AutoService from 'mainProcess/Service';
import { Favicon } from 'mainProcess/Core/Favicon';
import Koa from 'koa';
import { Listen } from 'mainProcess/Core/Listen';
import Middleware from 'mainProcess/Middlewares/Middleware';
import Route from 'mainProcess/Route';
import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import path from 'path';
import serveStatic from 'koa-static';

const app = new Koa();
Listen(app, () => AutoService());
Favicon(app);
app.use(Middleware());
app.use(bodyparser());
app.use(compress());
app.use(Route.routes());
app.use(serveStatic(path.join(__dirname)));
