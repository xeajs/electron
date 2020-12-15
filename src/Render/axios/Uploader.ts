import axiosSource, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';

import axios from './index';

export type UploadFileTypes = File | FileList | FormData;
export interface ProgressType {
  progress: number;
  loaded: number;
  total: number;
  timeStamp: number;
}

export default class FileProgressRequest {
  private file: UploadFileTypes;
  private _onProgress;
  private _onSuccess;
  private _onError;
  private Canceler?: Canceler;
  private DefaultOptions: AxiosRequestConfig;
  constructor(file: UploadFileTypes, options?: AxiosRequestConfig) {
    this.file = file;
    this.DefaultOptions = {
      method: 'post',
      /** 默认上报地址 */
      url: '/upload',
      cancelToken: new axiosSource.CancelToken((cancel) => (this.Canceler = cancel)),
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        this._onProgress && this._onProgress(this.transformData(progressEvent));
      },
      ...(options ?? {})
    };
  }
  public upload(): this {
    let data = new FormData();
    if (this.file instanceof FileList) {
      Array.prototype.forEach.call(this.file, (item, index, array) => {
        if (this.file[index] instanceof File) {
          data.append(`file${index}`, this.file[index]);
        }
      });
    }
    if (this.file instanceof File) {
      data.append('file0', this.file);
    }
    if (this.file instanceof FormData) {
      data = this.file;
    }
    this.DefaultOptions.data = data;
    axios
      .request(this.DefaultOptions)
      .then((onfulfilled) => this._onSuccess && this._onSuccess(onfulfilled))
      .catch((error: Error) => this._onError && this._onError(error));
    return this;
  }
  private transformData(e: ProgressEvent): ProgressType {
    return {
      progress: e.total ? Math.floor((e.loaded / e.total) * 100) : 0,
      loaded: e.loaded,
      total: e.total,
      timeStamp: e.timeStamp
    };
  }
  public onProgress(callback?: (progressEvent: ProgressType) => void): this {
    this._onProgress = callback;
    return this;
  }
  public onSuccess<T>(callback?: (response: AxiosResponse<T>) => void): this {
    this._onSuccess = callback;
    return this;
  }
  public onCatch(callback?: (error: Error) => void): this {
    this._onError = callback;
    return this;
  }
  cancel(message?: string): void {
    this.Canceler && this.Canceler(message);
    this.Canceler = undefined;
  }
}
