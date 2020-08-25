export enum SendCode {
  'Default' = 'success',
  'Other' = '其他异常',
  'Wrongful' = '无效的 URI'
}
export enum SendMsg {
  'Default' = 0,
  'Other' = 99,
  'Wrongful' = -1
}
export type SendCodeType = SendCode | number;
export type SendMsgType = SendMsg | string;
