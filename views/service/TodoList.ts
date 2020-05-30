import Fetch from '@views/fetch';

export default {
  /**
   * “getTodoList”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  getTodoList(param?: object) {
    return Fetch.get('getTodoList', param);
  }
};
