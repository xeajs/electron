export type DbAggregate = 'hello' | 'todoList';

export type HelloDbType = {
  _id?: string;
  type: 'online' | 'offline';
  createDate: number;
  updateDate: number;
  /** byte 文件大小 */
  fileByteSize: number;
  /** ms 毫秒 音频时长 */
  fileDuration: number;
};

export type OtherDbType = {
  _id: string;
};

export type TodoListDbType = {
  _id: string;
  progress: number;
  name: string;
  updateTime: number;
};
