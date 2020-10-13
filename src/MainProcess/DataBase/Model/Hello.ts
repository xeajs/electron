import Core from 'MainProcess/DataBase/Core';

class Hello extends Core {
  constructor() {
    super('hello', $$.AppInfo.WorkDBPath);
  }
}

export default new Hello();
