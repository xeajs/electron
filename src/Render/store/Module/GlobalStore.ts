import { observable } from 'mobx';

export default class {
  @observable public version: string;

  public constructor() {
    this.version = process.versions.electron;
  }
}
