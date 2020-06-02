import React, { CSSProperties } from 'react';

interface BaseProps extends CSSProperties {
  title?: string;
}
const Wrap: React.FC<BaseProps> = (props) => {
  return (
    <section style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ddd' }}>
      {props.children ? <section style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.children}</section> : null}
    </section>
  );
};

export default Wrap;
