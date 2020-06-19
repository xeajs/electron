import React from 'react';
import { remote } from 'electron';

const Wrap: React.FC<{ focus: boolean; hover: boolean }> = (props) => {
  const __size__ = 14;
  const [color, setColor] = React.useState('#28ca40');
  const onFunc = () => {
    remote.getCurrentWindow().close();
  };
  React.useEffect(() => {
    setColor(props.focus ? '#28ca40' : '#dcdddd');
  }, [props.focus]);
  React.useEffect(() => {
    setColor(props.hover ? '#444' : '#28ca40');
  }, [props.hover]);
  return (
    <>
      <span onClick={onFunc} className={props.focus ? 'focus' : 'unfocus'}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7442" width={__size__} height={__size__}>
          <path d="M832 832H192V192h640v640z m50-690H142v740h740V142z" p-id="7443" fill={color}></path>
        </svg>
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
