/**
 * @See https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import 'mobx-react-lite/batchingForReactDom';

import { RouterStore } from 'mobx-react-router';
import StoreList from '@views/store';
import { configure } from 'mobx';
import { configureDevtool } from 'mobx-react-devtools';

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
