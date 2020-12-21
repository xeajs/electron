import Header from '@/Render/components/Header';
import IconSettings from '@/Render/components/SVG/Settings';
import React from 'react';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <section className="flex-col ui-pt-40">
      <section className="ui-mb-40">
        <Header os="darwin">
          <div className="flex-1 flex just-center align-center ui-w-100 ui-h-100">
            <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
            <IconSettings onFunc={() => history.push('/settings')} />
          </div>
        </Header>
        <Skeleton active></Skeleton>
      </section>
      <section>
        <Header os="win32">
          <div className="flex-1 flex just-center align-center ui-w-100 ui-h-100">
            <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
            <IconSettings onFunc={() => history.push('/settings')} />
          </div>
        </Header>
        <Skeleton active></Skeleton>
      </section>
    </section>
  );
};

export default Wrap;
