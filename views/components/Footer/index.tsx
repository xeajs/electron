import './index.css';

import * as React from 'react';

const pkg = require('~/package.json');

interface BaseProps {
  DeviceSeqNo: string;
}

export default class Footer extends React.Component<BaseProps, object> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex-col color-666 ui-p-15 ui-border-top">
        <div className="flex just-center align-center">
          <div>
            当前版本 {pkg.version}-{pkg.subversion}
          </div>
          <div className="flex-1 flex just-center align-center">Copyright © 2020</div>
          <div>{this.props.DeviceSeqNo}</div>
        </div>
      </div>
    );
  }
}
