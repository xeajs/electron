/**
 * @Author yejiang1015
 * @Date 2020-03-25 22:18:12
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-15 17:24:30
 * @Message Message
 * @param data      返回值
 * @param code      状态码 0 正常 !0 异常
 * @param message   返回描述
 */

import { SendCode, SendCodeType, SendMsg, SendMsgType, SendType } from '@/Typing/BaseTypes';

import Koa from 'koa';

export const Send = (ctx?: Koa.Context) => {
  return {
    succ: (data: unknown, code?: SendCodeType, message?: SendMsgType): SendType => {
      const _succ = {
        data: data ?? null,
        code: code || SendCode.Default,
        message: message || SendMsg.Default
      };
      /**
       * @数据库返回和接口响应通用
       */
      if (ctx) {
        ctx.status = 200;
        ctx.body = _succ;
      }
      return _succ;
    },
    fail: (code?: SendCodeType, message?: SendMsgType, data?: unknown): SendType => {
      const _fail = {
        data: data ?? null,
        code: code || SendCode.Other,
        message: message || SendMsg.Other
      };
      /**
       * @数据库返回和接口响应通用
       */
      if (ctx) {
        ctx.body = _fail;
        ctx.status = 200;
      }
      return _fail;
    }
  };
};
