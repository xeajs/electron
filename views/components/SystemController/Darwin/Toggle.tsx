import React from 'react';
import { remote } from 'electron';

/** 满屏 ===> 非满屏 */
const WrapFullToNormal: React.FC<{ color: string }> = (props) => {
  const __size__ = 16;
  return (
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11937" width={__size__} height={__size__}>
      <style jsx>{`
        svg {
          transform: scale(1.12);
        }
      `}</style>
      <path
        d="M128 512h342.826667a42.666667 42.666667 0 0 1 42.666666 42.666667L512 897.152 128 512z m769.493333-0.426667H554.666667a42.666667 42.666667 0 0 1-42.666667-42.666666V128.128l385.493333 383.36z"
        fill={props.color}
        p-id="11938"
      ></path>
    </svg>
  );
};

/** 非满屏 ===> 满屏 口 图标 */
const WrapNormalToFull: React.FC<{ color: string }> = (props) => {
  const __size__ = 16;
  return (
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1753" width={__size__} height={__size__}>
      <style jsx>{`
        svg {
          transform: scale(1.12);
        }
      `}</style>
      <path
        d="M749.056 230.4l-343.552 1.536c-24.576 0-30.208 14.336-12.8 31.232l368.128 368.128c17.408 17.408 31.232 11.264 31.232-12.8l1.024-343.552c0-24.576-19.968-44.544-44.032-44.544zM263.168 392.192c-17.408-17.408-31.232-11.264-31.232 12.8l-1.024 343.552c0 24.576 19.968 44.032 44.032 44.032l343.552-1.536c24.576 0 30.208-14.336 12.8-31.232L263.168 392.192z"
        p-id="1754"
        fill={props.color}
      ></path>
    </svg>
  );
};

const Wrap: React.FC<{ focus: boolean; hover: boolean }> = (props) => {
  const [color, setColor] = React.useState('#dcdddd');
  const [isFullScreen, setIsFullScreen] = React.useState(remote.getCurrentWindow().isFullScreen());
  const onFunc = () => {
    remote.getCurrentWindow().setFullScreen(!isFullScreen);
  };
  React.useEffect(() => {
    const resizeHandle = () => {
      setIsFullScreen(remote.getCurrentWindow().isFullScreen());
    };
    remote.getCurrentWindow().on('resize', resizeHandle);
    return () => {
      remote.getCurrentWindow().off('resize', resizeHandle);
    };
  }, []);
  React.useEffect(() => {
    setColor(props.focus ? '#28ca40' : '#dcdddd');
  }, [props.focus]);
  React.useEffect(() => {
    setColor(props.hover ? '#444' : '#28ca40');
  }, [props.hover]);
  return (
    <>
      <span onClick={onFunc} className={props.focus ? 'focus' : 'unfocus'}>
        {isFullScreen ? <WrapFullToNormal color={color} /> : <WrapNormalToFull color={color} />}
      </span>
      <style jsx>{`
        .focus {
          background-color: #28ca40;
          border: 1px solid #30ae2e;
        }
        .unfocus {
          background-color: #dcdddd;
          border: 1px solid #ced4cc;
        }
        span {
          display: flex;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Wrap;
