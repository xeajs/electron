/**
 * @Author yejiang1015
 * @Date 2020-06-20 13:18:35
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-08-25 13:35:54
 * @Message header 区分系统
 */

import React from 'react';
import WrapDarwin from './WrapDarwin';
import WrapWin32 from './WrapWin32';

interface BaseProps {
  os?: NodeJS.Platform;
}

const Wrap: React.FC<BaseProps> = (props) => {
  const __os__ = props.os || $$.AppInfo.platform;
  return (
    <>
      <div className="app-header">{__os__ === 'darwin' ? <WrapDarwin {...props} /> : <WrapWin32 {...props} />}</div>
      <style jsx>{`
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #e9ecf2;
          position: relative;
          padding-bottom: 2px;
        }
        .app-header::before {
          content: '';
          position: absolute;
          bottom: 1px;
          height: 0.6px;
          width: 100%;
          z-index: 0;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Wrap;
