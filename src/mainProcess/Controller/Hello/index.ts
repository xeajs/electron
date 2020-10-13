import { HelloDB } from 'mainProcess/DataBase';
import { HelloDbType } from 'typing/DataBaseTypes';
import Koa from 'koa';
import { Send } from 'mainProcess/Core';

export const Post = async (ctx: Koa.BaseContext) => {
  Send(ctx).succ('hello');
};

export const Get = async (ctx: Koa.BaseContext, next) => {
  const db = await HelloDB.insert<HelloDbType>({
    type: 'online',
    createDate: Date.now(),
    updateDate: Date.now(),
    /** byte 文件大小 */
    fileByteSize: Date.now(),
    /** ms 毫秒 音频时长 */
    fileDuration: Date.now()
  });
  if (db.data) {
    const { data, code, message } = await HelloDB.findAll<HelloDbType>();
    if (data) {
      await Send(ctx).succ(data);
    } else {
      await Send(ctx).fail(code, message);
    }
  } else {
    await Send(ctx).fail(db.code, db.message);
  }
};
