import Koa from 'koa';
import favicon from 'koa-favicon';

export const Favicon = (app: Koa) => {
  app.use(favicon($$.joinPathBasedOnThePublic('assets/favicon/ico/favicon@4x.ico')));
};
