import { BaseContentProps } from './Content';
import { BaseFooterProps } from './Footer';
import { BaseHeaderProps } from './Header';
import { BaseSiderProps } from './Sider';
import React from 'react';

export interface BaseLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  Header?: React.ReactElement<BaseHeaderProps>;
  Footer?: React.ReactElement<BaseFooterProps>;
}

export default class extends React.Component<BaseLayoutProps> {
  constructor(props) {
    super(props);
  }
  static Header: React.FC<BaseHeaderProps>;
  static Footer: React.FC<BaseFooterProps>;
  static Content: React.FC<BaseContentProps>;
  static Sider: React.FC<BaseSiderProps>;
  render() {
    const { Header, Footer } = this.props;
    return (
      <section className="ui-vw-100 ui-vh-100 flex-col">
        {Header ?? null}
        <main className="flex-1 flex ui-h-100 ui-ov-h">{React.Children.map(this.props.children, (child) => child)}</main>
        {Footer ?? null}
      </section>
    );
  }
}
