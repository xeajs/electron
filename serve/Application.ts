import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import path from 'path';
import serveStatic from 'koa-static';

const app = new Koa();
app.use(bodyparser());
app.use(compress());
/** __dirname = '~/dist/serve/index.js' */
app.use(favicon(path.join(path.resolve(), '../../favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../')));
app.use(serveStatic(path.resolve(__dirname, '../views/')));

app.listen(NodeListenPort, () => {
  global && global['isServeDone']();
});
