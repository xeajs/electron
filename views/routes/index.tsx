import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import ProviderProps from '@views/store/Provider';
import React from 'react';
import { Router } from 'react-router';
import { SwitchViewRoot } from './SwitchView';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory, new RouterStore());

export default (
  <Provider {...ProviderProps}>
    <ConfigProvider locale={zh_CN}>
      <Router history={history}>
        <SwitchViewRoot />
      </Router>
    </ConfigProvider>
  </Provider>
);
