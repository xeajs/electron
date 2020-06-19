/**
 * @notice 注意: 修改"全局声明"必须在模块内部, 所以至少要有 @export{} 字样
 */

declare global {
  export type DirPath = string;
  export type FilePath = string;
  export namespace ROOT {
    const name: Readonly<string>;
    const $log: (docs: Error | string, type?: 'log' | 'info' | 'warn' | 'error', path?: string) => void;
    const AppInfo: Readonly<{
      platform: NodeJS.Platform;
      version: string;
      nodeVersion: string;
      chromeVersion: string;
      /** 软件外部存储根目录 */
      WorkPath: DirPath;
      /** 日志信息存储目录 */
      WorkLogPath: DirPath;
      /** 数据库存储目录 */
      WorkDBPath: DirPath;
      /** 软件定制化设置信息存储文件地址 */
      WorkSettingPath: FilePath;
    }>;
    /** 临时在全局存一个值，取了之后就删除 */
    const ShortTime: { [key in keyof string]?: any };
  }
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
export {};
