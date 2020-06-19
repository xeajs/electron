import React from 'react';
import { remote } from 'electron';

const Wrap: React.FC<{ focus: boolean; hover: boolean }> = (props) => {
  const __size__ = 14;
  const [color, setColor] = React.useState('#ffbd2d');
  const onFunc = () => {
    remote.getCurrentWindow().close();
  };
  React.useEffect(() => {
    setColor(props.focus ? '#ffbd2d' : '#dcdddd');
  }, [props.focus]);
  React.useEffect(() => {
    setColor(props.hover ? '#444' : '#ffbd2d');
  }, [props.hover]);
  return (
    <>
      <span onClick={onFunc} className={props.focus ? 'focus' : 'unfocus'}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6887" width={__size__} height={__size__}>
          <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="6888" fill={color}></path>
        </svg>
      </span>
      <style jsx>{`
        .focus {
          background-color: #ffbd2d;
          border: 1px solid #e0a32d;
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
        span > svg {
          transform: scale(1.02);
        }
        span:hover {
        }
      `}</style>
    </>
  );
};

export default Wrap;
