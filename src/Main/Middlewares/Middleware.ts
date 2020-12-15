import { SendCode, SendMsg } from '@/Types/BaseTypes';

import Koa from 'koa';
import { Send } from '@/Main/Core';

export default function Middleware() {
  return async function Middleware(ctx: Koa.Context, next) {
    await next();
    if (!ctx.body) Send(ctx).fail(SendCode.Wrongful, SendMsg.Wrongful);
  };
}
