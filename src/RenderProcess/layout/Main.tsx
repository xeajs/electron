import DevToolsShowRouterPath from 'RenderProcess/components/DevToolsShowRouterPath';
import Header from 'RenderProcess/components/Header';
import IconSettings from 'RenderProcess/components/SVG/Settings';
import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = (props) => {
  const history = useHistory();
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <Header>
        <div className="flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag"></div>
          <IconSettings onFunc={() => history.push('/settings')} />
        </div>
      </Header>
      <main className="flex-1 ui-ovy-a ui-w-100 ui-h-100">{props.children}</main>
      <DevToolsShowRouterPath />
    </section>
  );
};

export default Wrap;
