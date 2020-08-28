import axios, { InjectAbort } from '@views/axios';

export default {
  /**
   * “Hello”接口
   *
   * @param {unknown} data 请求数据
   * @returns 后台返回的数据
   * @InjectAbort 给 hello 的静态属性上添加一个 abort 方法。用于终止请求
   */
  hello(param?: object) {
    return axios.get('hello', InjectAbort(this.hello, param));
  }
};
