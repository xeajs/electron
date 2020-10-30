/**
 * @private 不能在声明它的类的外部访问
 * @protected 在派生类中仍然可以访问
 * @public 默认 自由的访问程序里定义的成员
 * @static 静态成员
 * @readonly 将属性设置为只读的 只读属性必须在声明时或构造函数里被初始化
 * @doc https://github.com/louischatriot/nedb
 */

import { SendCode, SendMsg, SendType } from '@/Types/BaseTypes';

import { DbAggregate } from '@/Types/DataBaseTypes';
import NedbStore from 'nedb';
import { Send } from '@/Main/Core/Send';
import crypto from 'crypto';
import path from 'path';

/** 算法类型 */
const crypto_ALGORITHMTYPE = 'aes-256-cbc';
/** 加密key length = 32 */
const crypto_KEY = 'xeajs_xxxxxxxxxxxxxx_keyPassword';
/** 加密 IV length = 16 */
const crypto_IV = 'xeajs_x_electron';

export default class DataBaseInstance extends NedbStore {
  /** 数据库名称 */
  readonly dbName: DbAggregate;
  /** 数据库 .db 文件路径 */
  readonly dbPath: string;
  /** 数据库实例 */
  readonly dbInstance: NedbStore;
  constructor(dbName: DbAggregate, dbPath: string) {
    super();
    this.dbName = dbName;
    this.dbPath = path.join(dbPath, `${dbName}.db`);
    this.dbInstance = this.createInstance(dbName, this.dbPath);
  }

  private lineIsJson(line: string): boolean {
    line = Reflect.toString.call(line) === '[object String]' ? line : JSON.stringify(line);
    try {
      line = JSON.parse(line);
    } catch (e) {
      return false;
    }
    return typeof line === 'object' && line !== null;
  }

  private createInstance(dbName: string, dbPath: string): NedbStore {
    if (!dbName || !dbPath) {
      throw new Error(`【db】初始化数据库异常: dbName = ${dbName} dbPath = ${dbPath}`);
    }
    return new NedbStore({
      filename: dbPath,
      autoload: true,
      onload: (error) => {
        if (error) {
          console.error(`【db】 ${dbName} load fail`, error);
          throw new Error(error.toString());
        }
        console.log(`%c【db】 ${dbName} load success`, 'color: #67C23A;');
      },
      /** 写入时加密 */
      afterSerialization: (line: string) => {
        if (this.lineIsJson(line)) {
          try {
            const cipher = crypto.createCipheriv(crypto_ALGORITHMTYPE, crypto_KEY, crypto_IV);
            const encrypted = cipher.update(JSON.stringify(line), 'utf8', 'hex') + cipher.final('hex');
            return encrypted;
          } catch (error) {
            return line;
          }
        }
        return line;
      },
      /** 读取时解密 */
      beforeDeserialization: (line: string) => {
        const decipher = crypto.createDecipheriv(crypto_ALGORITHMTYPE, crypto_KEY, crypto_IV);
        try {
          const decrypted = decipher.update(line, 'hex', 'utf8') + decipher.final('utf8');
          return JSON.parse(decrypted);
        } catch (e) {
          return line;
        }
      }
    });
  }

  private sort(documents: unknown): unknown {
    /** TODO: 所有查询，排序 */
    //   documents.sort((a, b) => b.updateDate - a.updateDate);
    // documents = documents.sort((a, b) => b.updateDate - a.updateDate);
    return documents;
  }

  async insert<T>(docs: T): Promise<SendType<T>> {
    if (typeof docs !== 'object' || !Object.keys(docs).length) {
      return Send().fail(SendCode.Illegal, SendMsg.Illegal) as SendType<T>;
    }
    return await new Promise((resolve) => {
      this.dbInstance.insert(docs, (error: Error, documents) => {
        if (error) {
          resolve(Send().fail(SendCode.Other, error.toString()) as SendType<T>);
        } else {
          this.sort(documents);
          resolve(Send().succ(documents, SendCode.Default) as SendType<T>);
        }
      });
    });
  }

  async remove(query: unknown): Promise<SendType<number | null>> {
    return await new Promise((resolve) => {
      this.dbInstance.remove(query, { multi: true }, (error: Error, n: number) => {
        if (error) {
          resolve(Send().fail(SendCode.Other, error.toString()) as SendType<null>);
        } else {
          resolve(Send().succ(n, SendCode.Default) as SendType<number>);
        }
      });
    });
  }

  async update<T>(query: unknown, updateQuery: unknown): Promise<SendType<T[] | null>> {
    return await new Promise((resolve) => {
      this.dbInstance.update(query, { $set: updateQuery }, {}, (error: Error, numberOfUpdated: number, affectedDocuments: unknown, upsert: boolean) => {
        if (error) {
          resolve(Send().fail(SendCode.Other, error.toString()) as SendType<null>);
        } else {
          resolve(Send().succ(affectedDocuments, SendCode.Default) as SendType<T[]>);
        }
      });
    });
  }

  async findOne<T>(query: unknown): Promise<SendType<T[] | null>> {
    return await new Promise((resolve) => {
      this.dbInstance.findOne(query, (error: Error, documents: unknown) => {
        if (error) {
          resolve(Send().fail(SendCode.Other, error.toString()) as SendType<null>);
        } else {
          resolve(Send().succ(documents, SendCode.Default) as SendType<T[]>);
        }
      });
    });
  }

  async findAll<T>(query?: unknown): Promise<SendType<T[] | null>> {
    return await new Promise((resolve) => {
      this.dbInstance.find(query || {}, (error: Error, documents: unknown[]): void => {
        if (error) {
          resolve(Send().fail(SendCode.Other, error.toString()) as SendType<null>);
        } else {
          this.sort(documents);
          resolve(Send().succ(documents, SendCode.Default) as SendType<T[]>);
        }
      });
    });
  }
}
