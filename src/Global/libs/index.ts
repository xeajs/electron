import fs from 'fs';
import path from 'path';

/** 同步递归创建文件夹, 返回文件夹目录 */
export function __mkdirSync(dirName: string): string {
  if (!dirName || fs.existsSync(dirName)) {
    return dirName;
  }
  if (__mkdirSync(path.dirname(dirName))) {
    try {
      fs.mkdirSync(dirName);
    } catch (error) {
      return dirName;
    }
    return dirName;
  }
  return dirName;
}
