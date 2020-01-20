import 'socket.io-client';

import React from 'react';
import { RouteComponentProps } from 'react-router';

interface BaseProps extends RouteComponentProps {
  Socket: SocketIOClient.Socket;
}
class ExtendsClassWrap<P = {}, S = {}> extends React.Component<BaseProps & P, {} & S> {}

export { ExtendsClassWrap };
export default React.Component;
