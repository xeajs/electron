/**
 * @notice 注意: 修改"全局声明"必须在模块内部, 所以至少要有 @export{} 字样
 */

import { RouteComponentProps } from 'react-router';

declare global {
  export namespace Root {
    export type FC = RouteComponentProps;
    // function AppWorkInfo(): AppWorkInfoType;
    // function GetGlobal(): GlobalType;
    // function SetGlobal(propertyKey: string, propertyValue: any): boolean;
    // function GetSettings(): SettingsType;
    // function SetSettings(settings?: SettingsType): boolean;
    // function Log(type: LogType, docs: string, logFile?: string): void;
  }
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
export {};
