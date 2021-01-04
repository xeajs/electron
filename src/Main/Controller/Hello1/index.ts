import { Context, Next } from 'koa';

import { Send } from '@/Main/Core';

export async function AllHello(ctx: Context, next: Next) {
  if (ctx.method === 'POST') {
    await Send(ctx).succ(ctx.request.body);
    return;
  }
  if (ctx.method === 'GET') {
    await Send(ctx).succ(ctx.request.query);
    return;
  }
  await Send(ctx).succ(ctx.querystring);
}
