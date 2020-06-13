import React, { CSSProperties, useEffect, useState } from 'react';
import { onFuncClose, onFuncMaximize, onFuncMini, onFuncRestore } from '@views/components/WindowFrame/utils';

import IconSvgClose from './icon/close';
import IconSvgMaximize from './icon/maximize';
import IconSvgMini from './icon/mini';
import IconSvgRestore from './icon/restore';
import { remote } from 'electron';

interface BaseProps extends CSSProperties {
  title?: string;
}
const Wrap: React.FC<BaseProps> = (props) => {
  const [isMaximized, setMaximized] = useState(remote.getCurrentWindow().isMaximized());
  useEffect(() => {
    remote.getCurrentWindow().on('resize', () => {
      setMaximized(remote.getCurrentWindow().isMaximized());
    });
  }, []);
  return (
    <>
      <section className="win-control">
        <section className="no-drag win-control-box">
          <div className="win-control-box-inner">
            <IconSvgClose onFunc={onFuncClose} />
            <IconSvgMini onFunc={onFuncMini} />
            {isMaximized ? <IconSvgRestore onFunc={onFuncRestore} /> : <IconSvgMaximize onFunc={onFuncMaximize} />}
          </div>
        </section>
        {props.children ? <section className="win-control-inner drag">{props.children}</section> : null}
      </section>
      <style jsx>{`
        .win-control {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9f9f9;
        }
        .win-control-inner {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .win-control-box {
          height: 100%;
          user-select: none;
        }
        .win-control-box-inner {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 64px;
          padding-left: 4px;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Wrap;
