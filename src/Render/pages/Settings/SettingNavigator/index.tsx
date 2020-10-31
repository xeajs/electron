import Header from '@/Render/components/Header';
import IconSettings from '@/Render/components/SVG/Settings';
import React from 'react';
import SystemController from '@/Render/components/SystemController';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <section className="flex-col">
      <br />
      <br />
      <br />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <SystemController os="darwin" />
        <SystemController os="win32" />
      </div>
      <br />
      <br />
      <br />
      <Header os="darwin">
        <div className="flex-1 flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
          <IconSettings onFunc={() => history.push('/settings')} />
        </div>
      </Header>
      <br />
      <br />
      <br />
      <Header os="win32">
        <div className="flex-1 flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
          <IconSettings onFunc={() => history.push('/settings')} />
        </div>
      </Header>
    </section>
  );
};

export default Wrap;
