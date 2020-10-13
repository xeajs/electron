/**
 * @Message [适用于路由根组件]
 * @Message 如果常规组件要继承，则需要显式的传递参数; 尽量不用
 */
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
export interface WarpProps extends RouteComponentProps {}

export { Component };
export default class Warp<Porps, State> extends Component<Porps & WarpProps, State & object> {}
