import Mac from './Darwin';
import React from 'react';
import Win from './Win32';

const Wrap: React.FC<{ os?: NodeJS.Platform }> = (props) => {
  const _os_ = props.os || 'darwin';
  return (
    <>
      <div className="no-drag systemController">{_os_ === 'darwin' ? <Mac /> : <Win />}</div>
      <style jsx>{`
        .systemController {
          height: 100%;
          width: auto;
          background-color: #ddd;
          padding: 0;
          display: flex;
          min-height: 30px;
        }
        .no-drag {
          -webkit-app-region: no-drag !important;
        }
        .drag {
          -webkit-app-region: drag !important;
        }
      `}</style>
    </>
  );
};

export default Wrap;
