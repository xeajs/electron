import Core from 'mainProcess/DataBase/Core';

class Hello extends Core {
  constructor() {
    super('hello', $$.AppInfo.WorkDBPath);
  }
}

export default new Hello();
