import React from 'react';
import WindowFrame from '@views/components/WindowFrame';
import pkg from '~/package.json';

interface BaseProps {}
const Wrap: React.FC<BaseProps> = (props) => {
  return (
    <section className="ui-vw-100 ui-vh-100 flex-col">
      <WindowFrame>{pkg.name.substring(1, 6)}</WindowFrame>
      <main className="flex-1 ui-ovy-a ui-w-100 ui-h-100">{props.children}</main>
    </section>
  );
};

export default Wrap;
