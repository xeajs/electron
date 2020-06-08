/**
 * 口 图标
 */
import { BaseWrapTypes, memoPropsAreEqual } from '@views/components/WindowFrame/utils';
import React, { FC, memo, useState } from 'react';

const Wrap: FC<BaseWrapTypes> = memo((props): React.ReactElement => {
  const [width] = useState<number>(props.width || 15);
  const [height] = useState<number>(props.height || 15);
  const [color] = useState<string>(props.color || '#666');
  return (
    <>
      <span onClick={props.onFunc}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7442" width={width} height={height}>
          <path d="M832 832H192V192h640v640z m50-690H142v740h740V142z" p-id="7443" fill={color}></path>
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
