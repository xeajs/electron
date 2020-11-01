import DevToolsShowRouterPath from '@/Render/components/DevToolsShowRouterPath';
import Header from '@/Render/components/Header';
import IconSettings from '@/Render/components/SVG/Settings';
import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ children, style, className }) => {
  const history = useHistory();
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <Header>
        <div className="flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
          <IconSettings onFunc={() => history.push('/settings')} />
        </div>
      </Header>
      <main className={`flex-1 ui-ovy-a ui-w-100 ui-h-100 ${className ?? ''}`} style={style ?? {}}>
        {children}
      </main>
      <DevToolsShowRouterPath />
    </section>
  );
};

export default Wrap;
