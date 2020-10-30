import { action, observable, runInAction } from 'mobx';

export default class {
  @observable public subnum: number;

  public constructor() {
    this.subnum = 0;
  }

  @action public updateGlobalStoreToSubnum = async (newSubnum: number) => {
    runInAction(() => {
      this.subnum = newSubnum;
    });
  };
}
