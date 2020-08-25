import React from 'react';
import SystemController from '@views/components/SystemController';

const WrapDarwin: React.FC = (props) => {
  return (
    <>
      <div className="darwin">
        <SystemController os="darwin" />
        <div className="header-content">{props.children}</div>
      </div>
      <style jsx>{`
        .darwin {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        .header-content {
          flex: 1;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default WrapDarwin;
