import * as React from 'react';

import { GlobalStore } from '@/store/index';
import { Switch } from 'antd';
import { observer } from 'mobx-react';
import { remote } from 'electron';

const win = remote.getCurrentWebContents();

interface BaseProps {
  GlobalStore: GlobalStore;
}
interface BaseState {}

@observer
export default class extends React.Component<BaseProps, BaseState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { GlobalStore } = this.props;
    if (GlobalStore.settings.devTools) {
      win.toggleDevTools();
    } else {
      win.toggleDevTools();
      win.closeDevTools();
    }
    return (
      <div className="setting-box flex just-center align-center">
        <div className="">
          <span className="ui-mr-10">开发者工具</span>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={GlobalStore.settings.devTools}
            onClick={(checked: boolean, event: Event) => {
              SPK.SetSettings({ devTools: checked });
            }}
          />
        </div>
      </div>
    );
  }
}
