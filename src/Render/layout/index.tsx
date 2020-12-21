import Layout from './Public';
import React from 'react';
import SystemController from '@/Render/components/SystemController';
import { platform } from 'os';

export const Wrap: React.FC = ({ children }) => {
  return (
    <Layout>
      <Layout.Header>
        <div className="flex-1"></div>
        <SystemController os={process.platform} />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default Wrap;
