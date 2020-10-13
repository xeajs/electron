import { SendCode, SendMsg } from 'Typing/BaseTypes';

import Koa from 'koa';
import { Send } from 'MainProcess/Core';

export default function Middleware() {
  return async function Middleware(ctx: Koa.BaseContext, next) {
    await next();
    if (!ctx.body) Send(ctx).fail(SendCode.Wrongful, SendMsg.Wrongful);
  };
}
