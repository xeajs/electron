/**
 * @notice 注意: 修改"全局声明"必须在模块内部, 所以至少要有 @export{} 字样
 */
import { Dialog } from 'electron';
import { SettingJsonTypes } from '@/Global/settingJson';
import { ListenerType, EventMapType } from '@/Main/Global/Event';
import { AppEventNames } from '@/Typing/EventTypes';

interface ElectronProcessVersions extends NodeJS.ProcessVersions {
  build?: string;
  appVersion: string;
}

declare global {
  export type DirPath = string;
  export type FilePath = string;
  export namespace $$ {
    const dialog: Dialog;
    const isPro: () => boolean;
    const joinPathBasedOnThePublic: (...dirOrPath: string[]) => string;
    const joinDirBasedOnTheCwd: (...dirOrPath: string[]) => string;
    /** 系统 Dialog 组件只有在主进程才能访问到， 把方法直接挂载到全局提供所有渲染进程访问 */
    const AppInfo: Readonly<{
      platform: NodeJS.Platform;
      versions: ElectronProcessVersions;
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
      const readSetting: () => SettingJsonTypes | undefined;
      const writeSetting: (settingInner: Partial<SettingJsonTypes>) => boolean;
    }
    export namespace Event {
      const on: (eventName: AppEventNames, listener: ListenerType) => () => void;
      const once: (eventName: AppEventNames, listener: ListenerType) => () => void;
      const emit: (eventName: AppEventNames, args: unknown) => boolean;
      const off: (eventName: AppEventNames, listener?: ListenerType) => boolean;
      const offAll: () => void;
      const listener: () => EventMapType;
    }
    export namespace log {
      const info: (message, ...logs) => void;
      const warn: (message, ...logs) => void;
      const error: (message, ...logs) => void;
    }
  }
}

export {};
