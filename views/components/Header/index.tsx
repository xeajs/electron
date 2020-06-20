/**
 * @Author yejiang1015
 * @Date 2020-06-20 13:18:35
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-06-20 13:53:56
 * @Message header 区分系统
 */

import React from 'react';
import SystemController from '@views/components/SystemController';

interface BaseProps {
  os?: NodeJS.Platform;
}

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
const WrapWin32: React.FC = (props) => {
  return (
    <>
      <div className="win32">
        <div className="header-title">
          <img className="title-icon" src="/favicon.ico" alt="" />
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

const Wrap: React.FC<BaseProps> = (props) => {
  const __os__ = props.os || ROOT.AppInfo.platform;
  return (
    <div className="header">
      {__os__ === 'darwin' ? <WrapDarwin {...props} /> : <WrapWin32 {...props} />}
      <style jsx>
        {`
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f9f9f9;
          }
        `}
      </style>
    </div>
  );
};

export default Wrap;
