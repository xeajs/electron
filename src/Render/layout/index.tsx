import Layout from './Public';
import React from 'react';
import SystemController from '@/Render/components/SystemController';

export const Wrap: React.FC = ({ children }) => {
  return (
    <Layout
      Header={
        <Layout.Header>
          <div className="flex-1 flex align-center ui-pl-16">
            <h1
              className="ui-m-0 no-drag"
              onClick={() => {
                window.location.href = '';
              }}
            >
              Electron App
            </h1>
          </div>
          <SystemController os={process.platform} />
        </Layout.Header>
      }
    >
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default Wrap;
