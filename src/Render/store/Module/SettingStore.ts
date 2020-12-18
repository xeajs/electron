import { action, observable, runInAction, toJS } from 'mobx';

import { SettingTypes } from '@/Global/__DefaultSettings';

export default class {
  @observable settings: SettingTypes;

  constructor() {
    this.settings = JSON.parse(JSON.stringify(toJS($$.Settings.readSetting())));
  }

  @action public SetSettings = async (newSetting: Partial<SettingTypes>) => {
    runInAction(() => {
      this.settings = Object.assign(toJS(this.settings), newSetting);
      $$.Settings.writeSetting(newSetting);
    });
  };
}
