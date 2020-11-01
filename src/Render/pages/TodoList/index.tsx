import AppLayout from '@/Render/layout/AppLayout';
import React from 'react';
import { SwitchViewTodo } from '@/Render/routes/SwitchView';
import { Tabs } from 'antd';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <AppLayout>
      <section className="flex just-center">
        <Tabs activeKey={history.location.pathname}>
          <Tabs.TabPane tab="Todo List" disabled key="/todo/list"></Tabs.TabPane>
          <Tabs.TabPane tab="Todo Info" disabled key="/todo/info"></Tabs.TabPane>
        </Tabs>
      </section>
      <section className="ui-p-16">
        <SwitchViewTodo />
      </section>
    </AppLayout>
  );
};

export default Wrap;
