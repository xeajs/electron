export type DbAggregate = 'hello';

export enum SendCode {
  Default = 0,
  Wrongful = -1,
  ErrId = 1,
  Illegal = 2,
  NoData = 3,
  IsData = 4,
  Other = 99
}
export enum SendMsg {
  Default = 'success',
  Wrongful = '无效的 URI',
  ErrId = '主键不合法',
  Illegal = '参数不合法',
  NoData = '数据不存在',
  IsData = '数据已存在',
  Other = '其他异常'
}

export type SendCodeType = SendCode | number;
export type SendMsgType = SendMsg | string;
export type SendType<T = unknown> = {
  code: SendCodeType;
  data: T;
  message: SendMsgType;
};
