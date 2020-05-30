import Fetch from '@views/fetch';

export default {
  /**
   * “Hello”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  hello(param?: object) {
    return Fetch.get('hello', param);
  }
};
