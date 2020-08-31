import { action, observable, runInAction, toJS } from 'mobx';

import LocalSettings from '~/global/Settings';
import { SettingTypes } from '~/types/settings';

export default class {
  @observable settings = LocalSettings;

  constructor() {
    this.Init();
  }

  @action private Init = () => {
    runInAction(() => {
      const localSettings: SettingTypes = $$.Settings.readFile() || LocalSettings;
      this.settings = JSON.parse(JSON.stringify(localSettings));
    });
  };

  @action public SetSettings = async (newSetting: Partial<SettingTypes>) => {
    runInAction(() => {
      this.settings = Object.assign(toJS(this.settings), newSetting);
      $$.Settings.writeFile(newSetting);
    });
  };
}
