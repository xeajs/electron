/// <reference path="./module.d.ts" />
/// <reference path="../global/index.d.ts" />
import { EventEmitter } from 'events';
import { BrowserWindow } from 'electron';

declare global {
  let speakinInstanceGlobalObject: any;
  /** node 服务 端口号 */
  const NodeListenPort: number;
  /** 软件窗口打开网页端口号 */
  const BrowserWindowPort: number;
  /** 主窗口实例 */
  const MainWindow: BrowserWindow;
  export namespace SPK {
    let EventEmitter: EventEmitter;
    function AppWorkInfo(): AppWorkInfoType;
    function GetGlobal(): GlobalType;
    function SetGlobal(propertyKey: string, propertyValue: any): boolean;
    function GetSettings(): SettingsType;
    function SetSettings(settings?: SettingsType): boolean;
    function Log(type: LogType, docs: string, logFile?: string): void;
  }
}
