import React from 'react';
import SystemController from '@views/components/SystemController';
import favicon from '~/public/assets/favicon/favicon.ico';

const WrapWin32: React.FC = (props) => {
  return (
    <>
      <div className="win32">
        <div className="header-title">
          <img className="title-icon" src={favicon} alt="" />
          <h1 className="title-text">{}</h1>
        </div>
        <div className="header-content">{props.children}</div>
        <SystemController os="win32" />
      </div>
      <style jsx>{`
        .win32 {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
        .title-icon {
          width: 22px;
          height: 22px;
          margin-left: 8px;
        }
        .title-text {
          margin: 0;
          padding: 0;
          padding-left: 8px;
        }
        .header-title {
          display: flex;
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

export default WrapWin32;
