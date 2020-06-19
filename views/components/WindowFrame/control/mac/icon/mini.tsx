import { BaseWrapTypes, memoPropsAreEqual } from '@views/components/WindowFrame/utils';
import React, { FC, memo, useState } from 'react';

const Wrap: FC<BaseWrapTypes> = memo((props): React.ReactElement => {
  const [width] = useState<number>(props.width || 16);
  const [height] = useState<number>(props.height || 16);
  const [color] = useState<string>(props.color || '#ffbd2d');
  return (
    <>
      <span onClick={props.onFunc}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6887" width={width} height={height}>
          <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="6888" fill={color}></path>
        </svg>
      </span>
      <style jsx>{`
        span {
          display: flex;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          padding: 2px;
          justify-content: center;
          align-items: center;
          background-color: #ffbd2d;
          border: 1px solid #e0a32d;
        }
        span:hover {
        }
      `}</style>
    </>
  );
}, memoPropsAreEqual);

export default Wrap;
