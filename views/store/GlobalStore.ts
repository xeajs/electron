import { action, observable, runInAction } from 'mobx';

export class GlobalStore {
  @observable.ref public settings: SettingsType;

  constructor() {
    this.settings = SPK.GetSettings();
    SPK.EventEmitter.on('globalSettingsUpdateStatus', ({}) => {
      this.updateGlobalStoreToSettings();
    });
  }

  @action public updateGlobalStoreToSettings = async () => {
    runInAction(() => {
      this.settings = SPK.GetSettings();
    });
  };
}
