import * as React from 'react';

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

export default class LayoutMain extends React.Component<{}, {}> {
  render() {
    return (
      <Layout>
        <Header className="drag">Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
