import Koa from 'koa';
import favicon from 'koa-favicon';

export const Favicon = (app: Koa) => {
  app.use(favicon($$.JoinDirWithRoot($$.isPro() ? 'resources/app.asar.unpacked/public/assets/favicon/favicon.ico' : 'public/assets/favicon/favicon.ico')));
};
