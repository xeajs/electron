import Config from '~/config';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import { ipcMain } from 'electron';
import path from 'path';
import serveStatic from 'koa-static';

const app: Koa.DefaultContext = new Koa();
app.use(bodyparser());
app.use(compress());
app.use(favicon(path.join(path.resolve(), 'favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../views/')));

app.listen(Config.port, () => {
  ipcMain.emit('openWindow');
});
