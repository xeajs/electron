import { Button, Empty, Rate, Skeleton, Spin } from 'antd';

import { GlobalStore } from '@views/store';
import LayoutMain from '@views/layout/Main';
import React from 'react';
import { useInject } from '@views/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap = (props) => {
  const rootStore = useInject<{ globalStore: GlobalStore }>('globalStore');
  React.useEffect(() => {
    setTimeout(() => {
      rootStore.globalStore.updateGlobalStoreToSettings('异步更新');
    }, 4000);
  }, []);
  return useObserver(() => (
    <LayoutMain>
      <section className="ui-v-100 ui-v-100 flex-col align-center just-center">
        <div style={{ backgroundColor: '#fff', marginTop: '40px' }} className="ui-w-100 flex just-center">
          <Rate allowHalf defaultValue={5} />
        </div>
        <div className="flex" style={{ marginTop: '40px' }}>
          <Button style={{ marginRight: '10px' }} onClick={() => props.history.push('/home')}>
            Home {rootStore.globalStore.appName}
          </Button>
          <Button onClick={() => props.history.push('/about')}>About</Button>
        </div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <Spin />
        <div style={{ backgroundColor: '#fff', height: '474px', width: '100%' }}>
          <Skeleton active />
        </div>
      </section>
    </LayoutMain>
  ));
};

export default Wrap;
