import React, { CSSProperties } from 'react';

import Mac from './control/mac';
import Win from './control/win';

interface BaseProps extends CSSProperties {
  title?: string;
}
const Wrap: React.FC<BaseProps> = (props) => {
  const platform = window.navigator.platform;
  const height = props.height || '30px';
  let _Wrap: React.ReactElement | null = null;
  switch (platform) {
    case 'Win32':
      _Wrap = <Win {...props} />;
      break;
    default:
      _Wrap = <Mac {...props} />;
      break;
  }
  return (
    <section className="drag" style={{ height }}>
      {_Wrap}
    </section>
  );
};

export default Wrap;
