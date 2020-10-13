import { ConfigProvider, message } from 'antd';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import { Provider } from 'mobx-react';
import ProviderProps from 'renderProcess/store/Provider';
import React from 'react';
import { Router } from 'react-router';
import { SwitchViewRoot } from './SwitchView';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const hashHistory = createHashHistory();
const history = syncHistoryWithStore(hashHistory, new RouterStore());

interface MessageConfigOptions {
  top?: string | number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}
type MessageConfig = (options: MessageConfigOptions) => void;
(message.config as MessageConfig)({ top: '50%' });

export default (
  <Provider {...ProviderProps}>
    <ConfigProvider locale={zh_CN}>
      <Router history={history}>
        <SwitchViewRoot />
      </Router>
    </ConfigProvider>
  </Provider>
);
