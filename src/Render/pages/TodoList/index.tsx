import AppLayout from '@/Render/layout/AppLayout';
import React from 'react';
import { SwitchViewTodo } from '@/Render/routes/SwitchView';
import { Tabs } from 'antd';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <AppLayout>
      <Tabs
        activeKey={history.location.pathname}
        onChange={(activeKey) => {
          history.push(activeKey);
        }}
      >
        <Tabs.TabPane tab="List" disabled key="/todo/list"></Tabs.TabPane>
        <Tabs.TabPane tab="Info" disabled key="/todo/info"></Tabs.TabPane>
      </Tabs>
      <SwitchViewTodo />
    </AppLayout>
  );
};

export default Wrap;
