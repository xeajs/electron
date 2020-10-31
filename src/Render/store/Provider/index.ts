import 'mobx-react-lite/batchingForReactDom';

import { RouterStore } from 'mobx-react-router';
import StoreList from '@/Render/store';
import { configure } from 'mobx';
import { configureDevtool } from 'mobx-react-devtools';

/** ============== console 重写 console 支持直接输出 mobx observable 数据 转 JavaScript 对象输出 ============== */
/** ============== @待定 TODO:  ============== */
/** ============== 如果对 mobx 数据结构不熟悉，会在开发中造成错觉 ============== */

/** ============== mobx dev tools ============== */
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
