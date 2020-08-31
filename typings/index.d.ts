/**
 * @notice 注意: 修改"全局声明"必须在模块内部, 所以至少要有 @export{} 字样
 */
import { Dialog } from 'electron';
import { SettingTypes } from '~/types/settings';
import { ListenerType, EventMapType } from '~/global/Event';
import { AppEventNames } from '~/types/event';
declare global {
  export type DirPath = string;
  export type FilePath = string;
  export namespace $$ {
    const name: Readonly<string>;
    const isPro: () => boolean;
    const JoinDirWithRoot: (...dir) => string;
    const isString: (arg) => Boolean;
    const isNumber: (arg) => Boolean;
    const isObject: (arg) => Boolean;
    const isUndefined: (arg) => Boolean;
    const isNull: (arg) => Boolean;
    const isFunction: (arg) => Boolean;
    const isPromise: (arg) => Boolean;
    const isArray: (arg) => Boolean;
    const isBoolean: (arg) => Boolean;
    /** 判断数值是否为有限 即除了正常的数值为true，其余诸如NaN, Infinity, '15'都为false */
    const isFinite: (arg) => Boolean;
    const isNaN: (arg) => Boolean;
    /** 系统 Dialog 组件只有在主进程才能访问到， 把方法直接挂载到全局提供所有渲染进程访问 */
    const dialog: Dialog;
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
    export namespace Settings {
      const readFile: (path?: string) => SettingTypes | undefined;
      const writeFile: (settingInner: Partial<SettingTypes>, path?: string) => boolean;
    }
    export namespace Event {
      const on: (eventName: AppEventNames, listener: ListenerType) => () => void;
      const once: (eventName: AppEventNames, listener: ListenerType) => () => void;
      const emit: (eventName: AppEventNames, args: unknown) => boolean;
      const off: (eventName: AppEventNames, listener?: ListenerType) => boolean;
      const offAll: () => void;
      const listener: () => EventMapType;
    }
  }
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
export {};
