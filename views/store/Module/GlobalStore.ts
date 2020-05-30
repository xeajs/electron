import { action, observable, runInAction } from 'mobx';

export default class {
  @observable public appName: string;
  @observable public subnum: number;

  public constructor() {
    this.appName = 'Hello Word';
    this.subnum = 10;
  }

  @action public updateGlobalStoreToSettings = async (newAppName: string) => {
    runInAction(() => {
      this.appName = newAppName;
    });
  };
  @action public updateGlobalStoreToSubnum = async (newSubNum: number) => {
    runInAction(() => {
      this.subnum = newSubNum;
    });
  };
}
