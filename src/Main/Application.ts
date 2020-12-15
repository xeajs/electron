import AutoService from '@/Main/Service';
import { Favicon } from '@/Main/Core/Favicon';
import Koa from 'koa';
import { Listen } from '@/Main/Core/Listen';
import Middleware from '@/Main/Middlewares/Middleware';
import Route from '@/Main/Route';
import bodyparser from 'koa-bodyparser';
import serveStatic from 'koa-static';

const app = new Koa();

/** @favicon */
Favicon(app);

app.use(Middleware());
app.use(bodyparser());
app.use(Route.routes());
app.use(Route.allowedMethods());

/**
 * @Message 部署软件窗口代码
 * @Eg <script src="/assets/js/xxx.hash[8].js" />
 */
app.use(serveStatic(__dirname));
/**
 * @Message 与webpack devServer 部署的静态资源目录保持一致
 * @Message 确保开发环境和生产环境使用的地址是一致的
 * @Eg <img src="/public/assets/favicon/png/favicon.png" alt="测试图片" />
 */
app.use(serveStatic($$.joinPathBasedOnThePublic('../')));

/** @Listen */
Listen(app, () => AutoService());
