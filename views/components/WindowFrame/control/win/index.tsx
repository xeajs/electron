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
        <section className="win-control-left">
          <img src="/favicon.ico" width="18" height="18" alt="" />
          {props.title ? <h1 className="win-control-title">{props.title}</h1> : null}
        </section>
        {props.children ? <section className="win-control-inner">{props.children}</section> : null}
        <section className="no-drag win-control-box">
          <div className="win-control-box-inner">
            <IconSvgMini onFunc={onFuncMini} />
            {isMaximized ? <IconSvgRestore onFunc={onFuncRestore} /> : <IconSvgMaximize onFunc={onFuncMaximize} />}
            <IconSvgClose onFunc={onFuncClose} />
          </div>
        </section>
      </section>
      <style jsx>{`
        .win-control {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9f9f9;
        }
        .win-control-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 100%;
          padding-left: 8px;
        }
        .win-control-title {
          margin: 0;
          margin-left: 8px;
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
          justify-content: flex-end;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Wrap;
