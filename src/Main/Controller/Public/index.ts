import { Context } from 'koa';
import { Send } from '@/Main/Core';

export const Hello = async (ctx: Context) => {
  if (ctx.method === 'POST') {
    return Send(ctx).succ(ctx.request.body);
  }
  if (ctx.method === 'GET') {
    return Send(ctx).succ(ctx.query);
  }
  Send(ctx).succ(ctx.querystring);
};
