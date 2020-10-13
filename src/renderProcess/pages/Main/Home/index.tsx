import { Button, Empty, Skeleton } from 'antd';
import React, { useEffect } from 'react';

import { helloIndexedDB } from 'renderProcess/indexedDB';
import { remote } from 'electron';
import { useHistory } from 'react-router';
import { useInjectAll } from 'renderProcess/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap: React.FC = () => {
  const Store = useInjectAll();
  const history = useHistory();
  const TextGlobalStoreUpdate = () => {
    Store.Global.updateGlobalStoreToSubnum(Store.Global.subnum + 1);
    helloIndexedDB.add([{ name: Date.now(), age: Date.now(), num: Store.Global.subnum }]);
    // helloIndexedDB.getAll().then((data) => {});
  };
  const changeGitee = () => {
    remote.getCurrentWebContents().toggleDevTools();
    Store.Setting.SetSettings({ devTools: !Store.Setting.settings.devTools });
  };
  useEffect(() => {
    helloIndexedDB.getAll().then((data: object[]) => {
      Store.Global.updateGlobalStoreToSubnum(data.length);
    });
    Store.Setting.SetSettings({ devTools: remote.getCurrentWebContents().isDevToolsOpened() });
  }, []);

  return useObserver(() => (
    <section className="ui-v-100 ui-v-100 flex-col align-center just-center">
      <div className="flex ui-pl-10" style={{ marginTop: '40px', flexWrap: 'wrap' }}>
        <Button type="dashed" style={{ margin: '0 6px', height: 88 }} onClick={TextGlobalStoreUpdate}>
          点击+1 Total{Store.Global.subnum}
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 88 }} onClick={() => history.push('/navigator')}>
          跨平台导航栏预览
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 88 }} onClick={() => history.push('/main/userMediaDevices')}>
          硬件设备
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 88 }} onClick={changeGitee}>
          Toggle Devleoper Tools {Store.Setting.settings.devTools.toString()}
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 88 }} onClick={() => history.push('/main/form')}>
          Form Preview
        </Button>
      </div>
      <div style={{ backgroundColor: '#fff', width: '100%' }}>
        <br />
        <Skeleton active />
      </div>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有更多啦" />
    </section>
  ));
};

export default Wrap;
