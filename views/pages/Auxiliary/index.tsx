import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { ExtendsClassWrap } from '@/components/Extends';
import { HeaderWrap } from '@/components/Header';
import { Layout } from 'antd';
import styles from './index.module.css';

const { Content } = Layout;
interface BaseProps {}

@inject('GlobalStore')
@observer
export default class App extends ExtendsClassWrap<BaseProps, {}> {
  render() {
    return (
      <Layout className="ui-vw-100 ui-vh-100">
        <HeaderWrap />
        <Content className={`${styles.content} flex-col`}>content</Content>
      </Layout>
    );
  }
}
