export default class IndexedDBInstance {
  IDBDatabaseInstance: IDBDatabase | null;
  dbName: string;
  dbVersion: number;
  constructor(dbName: string, dbVersion: number) {
    this.IDBDatabaseInstance = null;
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    (async () => {
      this.IDBDatabaseInstance = await this.openDB(dbName, dbVersion);
    })();
  }

  private Assertion() {
    if (!this.IDBDatabaseInstance) {
      throw new Error('数据库未初始化成功');
    }
  }

  private openDB(dbName: string, dbVersion: number): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const Request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);
      Request.onerror = function (e) {
        console.error(e);
        reject('数据库启动异常' + this.error?.message);
      };
      Request.onsuccess = function (e) {
        resolve(this.result);
        // console.info(`数据库${dbName}启动成功，版本 ${dbVersion}`);
      };
      Request.onupgradeneeded = function (e) {
        /** 数据库不存在，需要创建一个新的数据 */
        if (!this.result.objectStoreNames.contains(dbName)) {
          const Store = this.result.createObjectStore(dbName, { keyPath: '_id', autoIncrement: true });
          Store.createIndex('_id', '_id', { unique: true });
        }
        // console.info(`数据库${dbName}启动成功，版本变更为 ${dbVersion}`);
      };
    });
  }

  public add(docs: object[]) {
    this.Assertion();
    const store = this.IDBDatabaseInstance?.transaction(this.dbName, 'readwrite').objectStore(this.dbName);
    for (let i = 0; i < docs.length; i++) {
      store?.add(docs[i]);
    }
  }
  public findAll() {
    return new Promise((resolve, reject) => {
      this.Assertion();
      const store = this.IDBDatabaseInstance?.transaction(this.dbName, 'readwrite').objectStore(this.dbName);
      const request = store?.getAll();
      if (!request) {
        return reject(store);
      }
      request.onsuccess = function () {
        resolve(this.result);
      };
      request.onerror = function () {
        reject(this.error?.message);
      };
    });
  }
}
