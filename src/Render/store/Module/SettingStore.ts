import { action, observable, runInAction, toJS } from 'mobx';

import { SettingJsonTypes } from '@/Global/settingJson';

export default class {
  @observable settings: SettingJsonTypes;

  constructor() {
    this.settings = JSON.parse(JSON.stringify(toJS($$.Settings.readSetting())));
  }

  @action public SetSettings = async (newSetting: Partial<SettingJsonTypes>) => {
    runInAction(() => {
      this.settings = Object.assign(toJS(this.settings), newSetting);
      $$.Settings.writeSetting(newSetting);
    });
  };
}
