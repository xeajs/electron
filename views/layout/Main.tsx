import IconSettings from '@views/components/SVG/Settings';
import React from 'react';
import WindowFrame from '@views/components/WindowFrame';
import pkg from '~/package.json';
import { useHistory } from 'react-router';

const Wrap: React.FC = (props) => {
  const history = useHistory();
  const appName = `X${pkg.name.substring(2, 6)}-Electron`;
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
    </section>
  );
};

export default Wrap;
