/**
 * @Author yejiang1015
 * @Date 2020-03-25 22:18:12
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-10-13 12:53:41
 * @Message Message
 * @param data      返回值
 * @param code      状态码 0 正常 !0 异常
 * @param message   返回描述
 */

import { SendCode, SendCodeType, SendMsg, SendMsgType, SendType } from 'typing/BaseTypes';

import Koa from 'koa';

export const Send = (ctx?: Koa.BaseContext) => {
  return {
    succ: (data: unknown, code?: SendCodeType, message?: SendMsgType): void | SendType => {
      const _succ = {
        data: data || null,
        code: code || SendCode.Default,
        message: message || SendMsg.Default
      };
      if (ctx) {
        ctx.body = _succ;
        ctx.status = 200;
      } else {
        return _succ;
      }
    },
    fail: (code?: SendCodeType, message?: SendMsgType, data?: unknown): void | SendType => {
      const _fail = {
        data: $$.isUndefined(data) || $$.isNull(data) ? null : data,
        code: code || SendCode.Other,
        message: message || SendMsg.Other
      };
      if (ctx) {
        ctx.body = _fail;
        ctx.status = 200;
      } else {
        return _fail;
      }
    }
  };
};
