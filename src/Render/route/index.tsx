/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, message } from 'antd';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import AutoUpdater from '@/Render/components/AutoUpdater';
import Config from '~/config';
import { Provider } from 'mobx-react';
import ProviderProps from '@/Render/store/Provider';
import React from 'react';
import { Router } from 'react-router';
import { SwitchViewRoot } from './SwitchView';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

message.config({ top: '50%' as any });

const history = syncHistoryWithStore(createHashHistory({ basename: Config.publicPath }), new RouterStore());

export default (
  <Provider {...ProviderProps}>
    <ConfigProvider locale={zh_CN}>
      {Config.hotUpdater ? <AutoUpdater /> : null}
      <Router history={history}>
        <SwitchViewRoot />
      </Router>
    </ConfigProvider>
  </Provider>
);
