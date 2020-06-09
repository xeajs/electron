/**
 * @Author yejiang1015
 * @Date 2020-06-09 16:23:40
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-06-09 18:32:40
 * @Message 数据库连接方式分为一直open和单次open，然后close；
 * @Msg 简单结论：操作频繁就一直open，偶尔操作就临时open然后close；
 * @Current 临时open然后close；
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore
 */

export default class IndexedDBInstance {
  dbInstance: IDBDatabase;
  dbName: string;
  dbVersion: number;
  constructor(dbName: string, dbVersion: number) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  private async Assertion() {
    if (!this.dbInstance) {
      await this.OpenDB();
    }
  }

  private OpenDB(): Promise<IDBDatabase> {
    const _this = this;
    return new Promise((resolve, reject) => {
      const Request: IDBOpenDBRequest = indexedDB.open(_this.dbName, _this.dbVersion);
      Request.onerror = function () {
        console.error(this.error);
        reject('数据库启动异常' + this.error?.message);
      };
      /** 数据库${dbName}启动成功，版本 ${dbVersion} */
      Request.onsuccess = function () {
        _this.dbInstance = this.result;
        resolve(this.result);
      };
      /**
       * `数据库${dbName}启动成功，版本变更为 ${dbVersion}`
       * 数据库不存在，需要创建一个新的数据
       */
      Request.onupgradeneeded = function () {
        if (!this.result.objectStoreNames.contains(_this.dbName)) {
          const Store = this.result.createObjectStore(_this.dbName, { keyPath: '_id', autoIncrement: true });
          Store.createIndex('_id', '_id', { unique: true });
        }
      };
    });
  }

  private CloseDB(): void {
    Promise.resolve().then(() => {
      this.dbInstance.close();
      Reflect.set(this, 'dbInstance', null);
    });
  }

  /** IndexedDB 只支持单条插入 */
  public async addOne(doc: object, isClose = true) {
    await this.Assertion();
    const _this = this;
    return await new Promise((resolve, reject) => {
      const Request = this.dbInstance.transaction(this.dbName, 'readwrite').objectStore(this.dbName).add(doc);
      Request.onsuccess = function () {
        if (isClose) _this.CloseDB();
        resolve(this.result);
      };
      Request.onerror = function () {
        if (isClose) _this.CloseDB();
        console.error(this.error);
        reject(this.error?.message);
      };
    });
  }

  public async add(docs: object[]): Promise<boolean> {
    let isOk = true;
    for (let i = 0; i < docs.length; i++) {
      try {
        await this.addOne(docs[i], false);
      } catch (error) {
        isOk = false;
        console.error(error);
        break;
      }
    }
    return isOk;
  }

  public async getAll() {
    await this.Assertion();
    return await new Promise((resolve, reject) => {
      const _this = this;
      const Request = this.dbInstance.transaction(this.dbName, 'readwrite').objectStore(this.dbName).getAll();
      Request.onerror = function () {
        _this.CloseDB();
        console.error(this.error);
        reject(this.error?.message);
      };
      Request.onsuccess = function () {
        _this.CloseDB();
        resolve(this.result);
      };
    });
  }

  public async getKey(key: string) {
    return await new Promise((resolve, reject) => {
      this.Assertion();
      const _this = this;
      const Request = this.dbInstance.transaction(this.dbName, 'readwrite').objectStore(this.dbName).getKey(key);
      Request.onerror = function () {
        _this.CloseDB();
        console.error(this.error);
        reject(this.error?.message);
      };
      Request.onsuccess = function () {
        _this.CloseDB();
        resolve(this.result);
      };
    });
  }

  public async db() {
    await this.Assertion();
    return this.dbInstance;
  }
}
