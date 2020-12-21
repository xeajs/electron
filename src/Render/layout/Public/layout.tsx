import { BaseContentProps } from './Content';
import { BaseFooterProps } from './Footer';
import { BaseHeaderProps } from './Header';
import { BaseSiderProps } from './Sider';
import Header from './Header';
import React from 'react';

export interface BaseLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

export default class extends React.Component<BaseLayoutProps> {
  static Header: React.FC<BaseHeaderProps>;
  static Footer: React.FC<BaseFooterProps>;
  static Content: React.FC<BaseContentProps>;
  static Sider: React.FC<BaseSiderProps>;

  render() {
    return (
      <section className="ui-vw-100 ui-vh-100 flex-col">
        {React.Children.map(this.props.children, (child) => {
          let childName = (child && child['type']?.name) || '';
          return childName === 'Header' ? child : null;
        })}
        <main className="flex-1 flex ui-h-100 ui-ov-h">
          {React.Children.map(this.props.children, (child) => {
            let childName = (child && child['type']?.name) || '';
            return childName !== 'Header' && childName !== 'Footer' ? child : null;
          })}
        </main>
        {React.Children.map(this.props.children, (child) => {
          let childName = (child && child['type']?.name) || '';
          return childName === 'Footer' ? child : null;
        })}
      </section>
    );
  }
}
