import DBInstance from './instance';

class HelloIndexedDB extends DBInstance {
  constructor() {
    super('hello', 1);
  }
}

export const helloIndexedDB = new HelloIndexedDB();
