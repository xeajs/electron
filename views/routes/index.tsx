import 'moment/locale/zh-cn';

import * as React from 'react';
import * as store from '@/store';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { RouteViewsRoot } from '@/config/route.config';
import { Router } from 'react-router';
import { configure } from 'mobx';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/** 严格模式 不允许在动作之外进行状态修改 */
configure({ enforceActions: 'observed' });
/** 增加索引签名 */
interface StringMap<T> {
  [x: string]: T;
}
const appStore: StringMap<any> = store;
const routerStore = new RouterStore();
const rootStore: StringMap<any> = {
  routerStore
};
/** 扩展属性 */
for (const s in appStore) {
  rootStore[s] = new appStore[s]();
}
/** output `rootStore` */

const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory, routerStore);
const Root = (
  <Provider {...rootStore}>
    <ConfigProvider locale={zh_CN}>
      <Router history={history}>
        <RouteViewsRoot />
      </Router>
    </ConfigProvider>
  </Provider>
);

export default Root;
