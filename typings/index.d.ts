import { EventEmitter } from 'events';
import { BrowserWindow } from 'electron';

declare module '*.js';

/** 主窗口实例 */
declare let MainWindow: BrowserWindow;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let speakinInstanceGlobalObject: any;
  /** node 服务 端口号 */
  const NodeListenPort: number;
  /** 软件窗口打开网页端口号 */
  const BrowserWindowPort: number;
  export namespace SPK {
    let EventEmitter: EventEmitter;
    // function AppWorkInfo(): AppWorkInfoType;
    // function GetGlobal(): GlobalType;
    // function SetGlobal(propertyKey: string, propertyValue: any): boolean;
    // function GetSettings(): SettingsType;
    // function SetSettings(settings?: SettingsType): boolean;
    // function Log(type: LogType, docs: string, logFile?: string): void;
  }
}

declare module '*.less';
declare module '*.css';
declare module '*.png';
declare module '*.js';
