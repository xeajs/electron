import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export interface WarpProps extends RouteComponentProps {}
class Warp<P = {}, S = {}> extends Component<WarpProps & P, {} & S> {}

export { Component };
export default Warp;
