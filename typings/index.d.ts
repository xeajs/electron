/// <reference types="vite/client" />

declare global {
  export namespace $$ {
    const dialog: Dialog;

    export namespace Settings {
      const readSetting: () => SettingJsonTypes | undefined;
      const writeSetting: (settingInner: Partial<SettingJsonTypes>) => boolean;
    }
  }
}

export {};
