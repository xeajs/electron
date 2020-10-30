import axios from '@/Render/axios';

export default {
  /**
   * “getTodoList”接口
   *
   * @param {unknown} data 请求数据
   * @returns 后台返回的数据
   */
  getTodoList(param?: object) {
    return axios.get('getTodoList', param);
  }
};
