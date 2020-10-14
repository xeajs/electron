/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @See https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import 'mobx-react-lite/batchingForReactDom';

import { configure, isObservable, toJS } from 'mobx';

import { RouterStore } from 'mobx-react-router';
import StoreList from 'renderProcess/store';
import { configureDevtool } from 'mobx-react-devtools';

// /** ============== console 重写 console 支持直接输出 mobx observable 数据 转 JavaScript 对象输出 ============== */
// const ConsoleToJs = (msg, ...agrs) => [msg, ...agrs].map((msg) => (isObservable(msg) ? toJS(msg) : msg));
// const applog = console.log;
// const apperror = console.error;
// const appinfo = console.info;
// console.log = (msg, ...args) => applog.apply(console, ConsoleToJs(msg, args));
// console.info = (msg, ...args) => appinfo.apply(console, ConsoleToJs(msg, args));
// console.error = (msg, ...args) => apperror.apply(console, ConsoleToJs(msg, args));
// /** ============== console 重写 console 支持直接输出 mobx observable 数据 转 JavaScript 对象输出 ============== */

if (!$$.isPro()) {
  configureDevtool({
    /** 启用 log */
    logEnabled: true,
    /** 启用 updates */
    updatesEnabled: true,
    /** 启用 graph 图表 */
    graphEnabled: true
  });
}

/** ============== dev tools ============== */
if (!$$.isPro()) {
  configureDevtool({
    /** 启用 log */
    logEnabled: true,
    /** 启用 updates */
    updatesEnabled: true,
    /** 启用 graph 图表 */
    graphEnabled: true
  });
}

/** ============== 严格模式 不允许在动作之外进行状态修改 ============== */
configure({ enforceActions: 'observed' });
/** ============== 严格模式 不允许在动作之外进行状态修改 ============== */

const ProviderProps = { ...StoreList };
ProviderProps['routerStore'] = new RouterStore();

export default ProviderProps;
