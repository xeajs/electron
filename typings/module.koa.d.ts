import Koa from 'koa';
declare module 'koa' {
  interface Request {
    body?: unknown | any;
    rawBody: string;
  }
}
