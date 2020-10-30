import AutoService from '@/Main/Service';
import { Favicon } from '@/Main/Core/Favicon';
import Koa from 'koa';
import { Listen } from '@/Main/Core/Listen';
import Middleware from '@/Main/Middlewares/Middleware';
import Route from '@/Main/Route';
import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import path from 'path';
import serveStatic from 'koa-static';

const app = new Koa();

app.use(Middleware());
app.use(compress());
app.use(bodyparser());
app.use(Route.routes());
app.use(Route.allowedMethods());
app.use(serveStatic(path.join(__dirname)));
Listen(app, () => AutoService());
Favicon(app);
