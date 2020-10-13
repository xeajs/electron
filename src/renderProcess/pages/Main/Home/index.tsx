import { Button, Empty, Skeleton } from 'antd';
import React, { useEffect } from 'react';

import TodoList from 'renderProcess/components/TodoList';
import { remote } from 'electron';
import { useHistory } from 'react-router';
import { useInjectAll } from 'renderProcess/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap: React.FC = () => {
  const Store = useInjectAll();
  const history = useHistory();
  const changeGitee = () => {
    remote.getCurrentWebContents().toggleDevTools();
    Store.Setting.SetSettings({ devTools: !Store.Setting.settings.devTools });
  };
  useEffect(() => {
    Store.Setting.SetSettings({ devTools: remote.getCurrentWebContents().isDevToolsOpened() });
  }, []);

  return useObserver(() => (
    <section className="ui-v-100 ui-v-100 flex-col align-center just-center">
      <div className="flex ui-pl-10" style={{ marginTop: '28px', flexWrap: 'wrap' }}>
        <Button type="dashed" style={{ margin: '0 6px', height: 48 }} onClick={() => history.push('/navigator')}>
          跨平台导航栏预览
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 48 }} onClick={() => history.push('/main/userMediaDevices')}>
          硬件设备
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 48 }} onClick={changeGitee}>
          Toggle Devleoper Tools {Store.Setting.settings.devTools.toString()}
        </Button>
        <Button type="dashed" style={{ margin: '0 6px', height: 48 }} onClick={() => history.push('/main/form')}>
          Form Preview
        </Button>
      </div>
      <TodoList />
      <div style={{ backgroundColor: '#fff', width: '100%' }}>
        <br />
        <Skeleton active />
      </div>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有更多啦" />
    </section>
  ));
};

export default Wrap;
