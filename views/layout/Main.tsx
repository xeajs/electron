import { useHistory, useLocation } from 'react-router';

import IconSettings from '@views/components/SVG/Settings';
import React from 'react';
import WindowFrame from '@views/components/WindowFrame';
import pkg from '~/package.json';

const Wrap: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const appName = `X${pkg.name.substring(2, 6)}-Electron-${location.pathname.split('/').filter((d) => d)[1]}`;
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <WindowFrame>
        <section className="flex-1 flex just-center align-center">{appName}</section>
        <IconSettings
          onFunc={() => {
            history.push('/main/settings');
          }}
        />
      </WindowFrame>
      <main className="flex-1 ui-ovy-a ui-w-100 ui-h-100">{props.children}</main>
      <footer className="flex just-center align-center">@Copyright 2019 - {new Date().getFullYear()}</footer>
    </section>
  );
};

export default Wrap;
