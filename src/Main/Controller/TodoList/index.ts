import { Context } from 'koa';
import { Send } from '@/Main/Core';
import { TodoList } from '@/Main/DataBase';
import { TodoListDbType } from '@/Typing/DataBaseTypes';

export async function Find(ctx: Context) {
  const { _id } = ctx.query;
  if (_id) {
    const _data_ = await TodoList.findOne<TodoListDbType>({ _id });
    Send(ctx).succ(_data_.data, _data_.code, _data_.message);
    return _data_;
  }
  const _data_ = await TodoList.findAll<TodoListDbType>();
  Send(ctx).succ(_data_.data, _data_.code, _data_.message);
  return _data_;
}

export async function Add(ctx: Context) {
  const db = await TodoList.insert<TodoListDbType>(ctx.request.body);
  if (!db.code) {
    const { data, code, message } = await TodoList.findAll<TodoListDbType>();
    if (data) {
      await Send(ctx).succ(data, code, message);
    } else {
      await Send(ctx).fail(code, message, data);
    }
  } else {
    await Send(ctx).fail(db.code, db.message, db.data);
  }
}
export async function Update(ctx: Context) {
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
}
export async function Delete(ctx: Context) {
  const { _id } = ctx.query;
  await TodoList.remove({ _id });
  const { data, code, message } = await TodoList.findAll<TodoListDbType>();
  if (data) {
    await Send(ctx).succ(data);
  } else {
    await Send(ctx).fail(code, message);
  }
}
