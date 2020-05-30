/**
 * @See https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import 'mobx-react-lite/batchingForReactDom';

import { RouterStore } from 'mobx-react-router';
import StoreList from '@views/store';
import { configure } from 'mobx';

/** ============== 严格模式 不允许在动作之外进行状态修改 ============== */
configure({ enforceActions: 'observed' });
/** ============== 严格模式 不允许在动作之外进行状态修改 ============== */

const ProviderProps = { ...StoreList };
ProviderProps['routerStore'] = new RouterStore();

export default ProviderProps;
