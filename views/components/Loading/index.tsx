import * as React from 'react';

import { Spin } from 'antd';

export default class Loading extends React.Component<{}, {}> {
  render() {
    return (
      <div className="ui-vw-100 ui-vh-100 flex just-center align-center">
        <Spin tip="Loading..." size="large"></Spin>
      </div>
    );
  }
}
