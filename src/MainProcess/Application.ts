import AutoService from 'MainProcess/Service';
import { Favicon } from 'MainProcess/Core/Favicon';
import Koa from 'koa';
import { Listen } from 'MainProcess/Core/Listen';
import Middleware from 'MainProcess/Middlewares/Middleware';
import Route from 'MainProcess/Route';
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
