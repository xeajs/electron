import Koa from 'koa';
import favicon from 'koa-favicon';

export const Favicon = (app: Koa) => {
  const addr = `${$$.isPro() ? 'resources/app.asar.unpacked/' : ''}public/assets/favicon/ico/favicon@4x.ico`;
  app.use(favicon($$.JoinDirWithRoot(addr)));
};
