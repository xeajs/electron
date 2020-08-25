import Koa from 'koa';
import { Send } from '@serve/Core';

export const Post = async (ctx: Koa.BaseContext) => {
  Send(ctx).succ('hello');
};

export const Get = async (ctx: Koa.BaseContext, next) => {
  await Send(ctx).fail(2, '故意错误');
  await next();
  Send(ctx).succ('hello');
  Send(ctx).fail(9, '故意错误0');
};
