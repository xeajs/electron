import { BaseWrapTypes, memoPropsAreEqual } from '@views/components/WindowFrame/utils';
import React, { FC, memo, useState } from 'react';

const Wrap: FC<BaseWrapTypes> = memo((props): React.ReactElement => {
  const [width] = useState<number>(props.width || 16);
  const [height] = useState<number>(props.height || 16);
  const [color] = useState<string>(props.color || '#666');
  return (
    <>
      <span onClick={props.onFunc}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6887" width={width} height={height}>
          <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="6888" fill={color}></path>
        </svg>
      </span>
      <style jsx>{`
        span {
          padding: 0 16px;
          display: flex;
          justify-content: center;
          width: auto;
          align-items: center;
          background-color: transparent;
        }
        span:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </>
  );
}, memoPropsAreEqual);

export default Wrap;
