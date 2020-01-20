import './index.css';

import * as React from 'react';

import { GlobalStore, RecorderStore } from '@/store/index';
import { inject, observer } from 'mobx-react';

import BackBar from '@/components/BackBar';
import { ExtendsClassWrap } from '@/components/Extends';
import SettingsWrapAbout from './About';
import SettingsWrapOther from './Other';
import SettingsWrapPublicSetting from './PublicSetting';
import SettingsWrapRecordSetting from './RecordSetting';
import SettingsWrapUpload from './Upload';
import SettingsWrapWaveInfo from './WaveInfo';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
interface BaseProps {
  RecorderStore: RecorderStore;
  GlobalStore: GlobalStore;
}
interface BaseState {
  activeKey: string;
}

@inject('RecorderStore', 'GlobalStore')
@observer
export default class App extends ExtendsClassWrap<BaseProps, BaseState> {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'RecordSetting'
    };
  }

  render() {
    const { activeKey } = this.state;
    return (
      <div className="flex-col settings">
        <BackBar history={this.props.history} />
        <div className="ui-p-15">
          <Tabs tabPosition="left" onChange={(activeKey) => this.setState({ activeKey })} activeKey={activeKey}>
            <TabPane tab="采集设置" key="RecordSetting">
              <SettingsWrapRecordSetting />
            </TabPane>
            <TabPane tab="通用设置" key="PublicSetting">
              <SettingsWrapPublicSetting />
            </TabPane>
            <TabPane tab="数据上报" key="Upload">
              <SettingsWrapUpload />
            </TabPane>
            <TabPane tab="波形说明" key="WaveInfo">
              <SettingsWrapWaveInfo />
            </TabPane>
            <TabPane tab="软件维护" key="About">
              <SettingsWrapAbout />
            </TabPane>
            <TabPane tab="其他" key="Other">
              <SettingsWrapOther {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
