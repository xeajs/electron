import React, { CSSProperties } from 'react';

interface BaseProps extends CSSProperties {
  title?: string;
}
const Wrap: React.FC<BaseProps> = (props) => {
  return (
    <>
      <section className="win-control">
        <section className="win-control-left">
          <img src="/favicon.ico" width="18" height="18" alt="" />
          {props.title ? <h1 className="win-control-title">{props.title}</h1> : null}
        </section>
        {props.children ? <section className="win-control-inner">{props.children}</section> : null}
        <section className="no-drag win-control-box">
          <div className="win-control-box-inner"></div>
        </section>
      </section>
      <style jsx>{`
        .win-control {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ddd;
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
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .win-control-box {
          height: 100%;
          user-select: none;
        }
        .win-control-box-inner {
          display: inline-block;
          width: 128px;
          height: 100%;
          background-color: #ccc;
        }
      `}</style>
    </>
  );
};

export default Wrap;
