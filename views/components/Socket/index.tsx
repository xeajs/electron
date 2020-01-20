import * as React from 'react';

import socketIoClient from 'socket.io-client';

export default function Socket(Component): any {
  return class extends React.Component {
    renderSocket() {
      return socketIoClient('http://localhost:18955', {
        path: '/GYsocket'
      });
    }
    public render() {
      return <Component {...this.props} Socket={this.renderSocket()} {...this.state} />;
    }
  };
}
