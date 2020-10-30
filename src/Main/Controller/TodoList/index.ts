import { Context } from 'koa';
import { Send } from '@/Main/Core';
import { TodoList } from '@/Main/DataBase';
import { TodoListDbType } from '@/Types/DataBaseTypes';

export const Find = async (ctx: Context) => {
  const { data } = await TodoList.findAll<TodoListDbType>();
  Send(ctx).succ(data);
};
export const Add = async (ctx: Context) => {
  const db = await TodoList.insert<TodoListDbType>(ctx.request.body);
  if (db.data) {
    const { data, code, message } = await TodoList.findAll<TodoListDbType>();
    if (data) {
      await Send(ctx).succ(data);
    } else {
      await Send(ctx).fail(code, message);
    }
  } else {
    await Send(ctx).fail(db.code, db.message);
  }
};
export const Update = async (ctx: Context) => {
  const { _id, docs } = ctx.body;
  const db = await TodoList.update<TodoListDbType>({ _id }, docs);
  if (db.data) {
    const { data, code, message } = await TodoList.findAll<TodoListDbType>();
    if (data) {
      await Send(ctx).succ(data);
    } else {
      await Send(ctx).fail(code, message);
    }
  } else {
    await Send(ctx).fail(db.code, db.message);
  }
};
export const Delete = async (ctx: Context) => {
  const { _id } = ctx.query;
  await TodoList.remove({ _id });
  const { data, code, message } = await TodoList.findAll<TodoListDbType>();
  if (data) {
    await Send(ctx).succ(data);
  } else {
    await Send(ctx).fail(code, message);
  }
};
