import React, { CSSProperties } from 'react';

interface BaseProps extends CSSProperties {
  title?: string;
}
const Wrap: React.FC<BaseProps> = (props) => {
  return (
    <section style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ddd' }}>
      <section style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100%', paddingLeft: '8px' }}>
        <img src="/favicon.ico" width="18" height="18" alt="" />
        {props.title ? <h1 style={{ margin: 0, marginLeft: 8 }}>{props.title}</h1> : null}
      </section>
      {props.children ? <section style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.children}</section> : null}
      <section className="no-drag" style={{ height: '100%' }}>
        <div style={{ display: 'inlin-block', width: '128px', height: '100%', backgroundColor: '#ccc' }}></div>
      </section>
    </section>
  );
};

export default Wrap;
