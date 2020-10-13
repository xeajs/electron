import Koa from 'koa';
export const Post = async (ctx: Koa.BaseContext) => {
  ctx.body = 'hello post';
};
export const Get = async (ctx: Koa.BaseContext) => {
  ctx.body = 'hello get';
};
