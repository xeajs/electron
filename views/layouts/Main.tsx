import * as React from 'react';

import { GlobalStore, RecorderStore } from '@/store/index';
import { inject, observer } from 'mobx-react';

import { ExtendsClassWrap } from '@/components/Extends';
import Footer from '@/components/Footer';
import { HeaderWrap } from '@/components/Header';
import { Layout } from 'antd';
import Menu from '@/components/Menu';
import { RouteViewsMain } from '@/config/route.config';

const { Content } = Layout;
interface BaseProps {
  GlobalStore: GlobalStore;
  RecorderStore: RecorderStore;
}

@inject('GlobalStore', 'RecorderStore')
@observer
export default class MainLayout extends ExtendsClassWrap<BaseProps, object> {
  constructor(props) {
    super(props);
  }

  render() {
    const { RecorderStore } = this.props;
    return (
      <div>
        <Layout className="ui-vw-100 ui-vh-100">
          <HeaderWrap {...this.props} />
          <Content className="flex" style={{ overflowX: 'hidden' }}>
            <Menu history={this.props.history} />
            <div className="flex-1">
              <RouteViewsMain />
            </div>
          </Content>
          <Footer DeviceSeqNo={RecorderStore.DeviceSeqNo} />
        </Layout>
      </div>
    );
  }
}
