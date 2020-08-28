import axios from 'axios';
import getEnv from './getEnv';

const instance = axios.create({
  baseURL: getEnv,
  timeout: 18000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

/** request过滤器 */
instance.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = 'Bearer ' + Date.now() || '';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** response过滤器 */
instance.interceptors.response.use(
  (response) => {
    // 未登录
    if (response.data.status === 401) {
      /** 登录已失效，请重新登录！ to Login pages */
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/** 当需要 终止请求的时候 请求参数使用该方法构造一下，终止时，调用 fn['abort']() 即可 */
export const InjectAbort = (fn: Function, param?: object) => {
  const _param = $$.isObject(param) ? param : {};
  const cancelTokenFn = { cancelToken: new axios.CancelToken((cancel) => Reflect.set(fn, 'abort', cancel)) };
  return Object.assign(_param, cancelTokenFn);
};

/** 返回axios实例 */
export default instance;
