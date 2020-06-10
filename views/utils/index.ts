/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @Author yejiang1015
 * @Date 2020-04-19 22:04:04
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-04-19 22:04:04
 */

export { Event } from './Event';

export default {
  isString(arg) {
    return Reflect.toString.call(arg) === '[object String]' ? true : false;
  },
  // 与isFinite不同的地方是NaN和Infinity都为true
  isNumber(arg) {
    return Reflect.toString.call(arg) === '[object Number]' ? true : false;
  },
  isObject(arg) {
    return Reflect.toString.call(arg) === '[object Object]' ? true : false;
  },
  isUndefined(arg) {
    return Reflect.toString.call(arg) === '[object Undefined]' ? true : false;
  },
  isNull(arg) {
    return Reflect.toString.call(arg) === '[object Null]' ? true : false;
  },
  isFunction(arg) {
    return Reflect.toString.call(arg) === '[object Function]' ? true : false;
  },
  isArray(arg) {
    return Reflect.toString.call(arg) === '[object Array]' ? true : false;
  },
  isBoolean(arg) {
    return Reflect.toString.call(arg) === '[object Boolean]' ? true : false;
  },
  // 判断数值是否为有限 即除了正常的数值为true，其余诸如NaN, Infinity, '15'都为false
  isFinite(arg) {
    return Number.isFinite(arg);
  },
  isNaN(arg) {
    return Number.isNaN(arg);
  },

  /**
   * 判断是否为空对象
   * @param obj 对象
   */
  isEmpty(obj: object): boolean {
    if (this.isObject(obj)) {
      for (const _i in obj) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  },

  /**
   * 获取字节的格式化 如1000B => 1KB
   * @param bytesLen 字节长度
   */
  getBytesFormat(bytesLen) {
    const units = ['B', 'KB', 'MB', 'GB'];
    const transformNumber = 1000;
    let index = 0;
    const setUnit = (_bytes) => {
      if (_bytes > transformNumber) {
        index++;
        return setUnit(_bytes / transformNumber);
      } else {
        return (Math.round(_bytes * 100) / 100).toFixed(2);
      }
    };
    const count = setUnit(bytesLen);
    const unit = units[index];

    return count + unit;
  },

  /**
   * 比较新旧props达到渲染优化
   * @param prevProps memo 中的prev props
   * @param nextProps memo 中的next props
   * @param renderProps 需要刷新渲染的props
   */
  compareProps<P extends object>(prevProps: React.PropsWithChildren<P>, nextProps: React.PropsWithChildren<P>, renderProps: string[]): boolean {
    if (!prevProps || !nextProps) return false;

    for (const propsName of renderProps) {
      const prep = Reflect.get(prevProps, propsName);
      const nexp = Reflect.get(nextProps, propsName);
      if (prep !== nexp) return false;
    }
    return true;
  },

  /**
   * 函数节流
   * @param {Function} func 执行函数
   * @param {number} [delay=0] 延迟时间(ms)
   * @returns {Function} 回调持续节流调用的函数
   * @message 一定时间内只触发一次函数、适用于诸如input事件，当用户输入时需要响应ajax请求，多次input只响应一次回调方法
   */
  throttle(func: Function, delay = 120): (...args: any) => void {
    let prev = Date.now();
    return (...args) => {
      const now = Date.now();
      if (now - prev >= delay) {
        func.call(null, ...args);
        prev = Date.now();
      }
    };
  },

  /**
   * 函数防抖
   *
   * @param {Function} func 执行函数
   * @param {number} [wait=0] 延迟时间(ms)
   * @returns {Function} 回调防抖函数
   * @message 将几次操作合并为一此操作进行、适用于resize或者鼠标移动事件，防止浏览器频繁响应事件，严重拉低性能
   */
  debounce(func: Function, wait = 120): (...args: any) => void {
    let timer: NodeJS.Timeout | null = null;
    return (...args) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(func.bind(null, ...args), wait);
    };
  },

  /**
   * 异步函数防重
   *
   * @param {() => Promise<void>} 异步函数func
   * @returns {() => Promise<void>}
   */
  preventDoublePress(func: () => Promise<void>): () => Promise<void> {
    let isPress = false;

    return async () => {
      if (isPress) return;
      isPress = true;
      await func();
      isPress = false;
    };
  },

  /**
   * 函数检测ip和port
   * @returns host 传入的host
   * @returns boolean
   */
  validHost(host: string) {
    // eslint-disable-next-line no-useless-escape
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    return reg.test(host);
  },

  /**
   * 函数检测ip
   * @returns ip 传入的ip
   * @returns boolean
   */
  isValidIP(ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return reg.test(ip);
  }
};
