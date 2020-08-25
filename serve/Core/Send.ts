/**
 * @Author yejiang1015
 * @Date 2020-03-25 22:18:12
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-08-25 11:23:55
 * @Message Message
 * @param data      返回值
 * @param code      状态码 0 正常 !0 异常
 * @param message   返回描述
 */

import { SendCode, SendCodeType, SendMsg, SendMsgType } from '~/types';

import Koa from 'koa';

export const Send = (ctx: Koa.BaseContext) => {
  return {
    succ: (data: unknown, code?: SendCodeType, message?: SendMsgType) => {
      const _succ = {
        data: data || null,
        code: code || SendCode.Default,
        message: message || SendMsg.Default
      };
      ctx.body = _succ;
      ctx.status = 200;
    },
    fail: (code?: SendCodeType, message?: SendMsgType) => {
      const _fail = {
        data: null,
        code: code || SendCode.Other,
        message: message || SendMsg.Other
      };
      ctx.body = _fail;
      ctx.status = 200;
    }
  };
};
