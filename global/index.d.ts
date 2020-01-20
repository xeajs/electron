declare interface GlobalType {
  /** settings.json */
  settings: SettingsType;
}

declare interface AppWorkInfoType {
  /** 安装目录 */
  InstallPath: string;
  /** 外部存储目录 */
  StoragePath: string;
  /** 外部存储目录 -- settings.json 文件目录 */
  StoragePathBySettings: string;
  /** log日志目录 */
  StoragePathByLog: string;
}

declare interface SettingsType {
  devTools?: boolean;
  noComplete?: number;
  noReport?: number;
  reportFail?: number;
}

declare type LogType = 'info' | 'warn' | 'error';
