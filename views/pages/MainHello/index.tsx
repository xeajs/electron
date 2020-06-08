import { Button, Empty, Rate, Skeleton, Spin } from 'antd';

import { GlobalStore } from '@views/store';
import React from 'react';
import { useHistory } from 'react-router';
import { useInject } from '@views/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap: React.FC = () => {
  const store = useInject<{ globalStore: GlobalStore }>('globalStore');
  const history = useHistory();
  const TextGlobalStoreUpdate = () => {
    store.globalStore.updateGlobalStoreToSubnum(store.globalStore.subnum + 1);
  };
  return useObserver(() => (
    <section className="ui-v-100 ui-v-100 flex-col align-center just-center">
      <div style={{ backgroundColor: '#fff', marginTop: '40px' }} className="ui-w-100 flex just-center">
        <Rate allowHalf defaultValue={5} />
      </div>
      <div className="flex" style={{ marginTop: '40px' }}>
        <Button style={{ marginRight: '10px' }} onClick={() => history.push('/main/hello')}>
          Hello
        </Button>
        <Button style={{ marginRight: '10px' }} onClick={TextGlobalStoreUpdate}>
          点击+1 当前总点击数{store.globalStore.subnum}
        </Button>
        <Button onClick={() => history.push('/about')}>About</Button>
      </div>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Spin />
      <div style={{ backgroundColor: '#fff', height: '474px', width: '100%' }}>
        <Skeleton active />
      </div>
    </section>
  ));
};

export default Wrap;
