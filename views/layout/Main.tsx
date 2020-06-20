import { useHistory, useLocation } from 'react-router';

import Header from '@views/components/Header';
import IconSettings from '@views/components/SVG/Settings';
import React from 'react';

const Wrap: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appName = `Xea Electron - ${process.env.NODE_ENV === 'development' ? location.pathname : location.pathname.split('/').filter((d) => d)[1]}`;
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <Header>
        <div className="flex just-center align-center ui-w-100 ui-h-100">
          <div className="flex-1 ui-h-100 flex just-center align-center drag">{appName}</div>
          <IconSettings
            onFunc={() => {
              history.push('/main/settings');
            }}
          />
        </div>
      </Header>
      <main className="flex-1 ui-ovy-a ui-w-100 ui-h-100">{props.children}</main>
      <footer className="flex just-center align-center">@Copyright 2019 - {new Date().getFullYear()}</footer>
      <style jsx>{`
        footer {
          background-color: #f9f9f9;
          border-top: 1px solid #ddd;
          font-size: 12px;
          height: 32px;
        }
      `}</style>
    </section>
  );
};

export default Wrap;
