import axios from 'axios';

// 创建axios实例
const instance: any = axios.create({
  baseURL: 'http://localhost',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  // 是否自动发送 cookie
  withCredentials: true
});

// request过滤器
instance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// response过滤器
instance.interceptors.response.use(
  (response: any) => {
    // 未登录
    if (response.data.status === 401) {
      console.log('401');
    }
    return response;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

// 返回axios实例
export default instance;
