import { action, observable, runInAction, toJS } from 'mobx';

import { SettingTypes } from 'Typing/SettingTypes';

export default class {
  @observable settings: SettingTypes;

  constructor() {
    this.settings = JSON.parse(JSON.stringify(toJS($$.Settings.read())));
  }

  @action public SetSettings = async (newSetting: Partial<SettingTypes>) => {
    runInAction(() => {
      this.settings = Object.assign(toJS(this.settings), newSetting);
      $$.Settings.write(newSetting);
    });
  };
}
