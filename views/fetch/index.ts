/**
 * @Author yejiang1015
 * @Date 2020-04-19 22:03:40
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-05-19 15:05:00
 * @Create [生成fetch实例，可配置公共配置]
 * @Fetch
 * @Fetch.request
 * @Fetch.get
 * @Fetch.post
 */

import ENV from './getEnv';
import Fetch from './fetch';
import { message } from 'antd';

const instance = new Fetch({
  timeout: 10000,
  baseURL: ENV
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['authorization'] = '1015' + Date.now();
    }
    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    message.warn(error?.message);
    return Promise.reject(error);
  }
);

export default instance;
