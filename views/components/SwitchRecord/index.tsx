import * as React from 'react';

import { Tabs } from 'antd';

const { TabPane } = Tabs;
const { useState } = React;
export default (props: any) => {
  const [activeKey, setActiveKey] = useState(props.match.path || '');
  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    props.history.push(activeKey);
  };
  return (
    <div className="ui-pl-15 ui-pr-15">
      <Tabs style={{ textAlign: 'center' }} onChange={(activeKey) => onChange(activeKey)} activeKey={activeKey}>
        <TabPane tab="首页采集" key="/main/home"></TabPane>
        <TabPane tab="采集列表" key="/main/recordList"></TabPane>
      </Tabs>
    </div>
  );
};
