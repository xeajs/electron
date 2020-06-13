import { BaseWrapTypes, memoPropsAreEqual } from '@views/components/WindowFrame/utils';
import React, { FC, memo, useState } from 'react';

const Wrap: FC<BaseWrapTypes> = memo((props): React.ReactElement => {
  const defaultColor = props.color || '#000';
  const [width] = useState<number>(props.width || 12);
  const [height] = useState<number>(props.height || 12);
  const [color, setColor] = useState<string>(defaultColor);
  const onMouseEnter = () => {
    setColor('#fff');
  };
  const onMouseLeave = () => {
    setColor(defaultColor);
  };
  return (
    <>
      <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={props.onFunc}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5512" width={width} height={height}>
          <path
            d="M822.003 776.822l0.023-0.022-575.522-575.483c-5.788-5.792-13.786-9.374-22.621-9.374-17.662 0-31.98 14.318-31.98 31.98 0 8.834 3.582 16.832 9.373 22.62L776.112 821.34c5.84 6.278 14.167 10.21 23.417 10.21 17.662 0 31.98-14.318 31.98-31.98 0-8.901-3.638-16.949-9.506-22.747z"
            p-id="5513"
            fill={color}
          ></path>
          <path
            d="M776.784 201.448l-0.023-0.022-575.483 575.521c-5.792 5.788-9.374 13.786-9.374 22.621 0 17.663 14.318 31.98 31.98 31.98 8.834 0 16.832-3.582 22.62-9.373L821.301 247.34c6.278-5.839 10.21-14.166 10.21-23.416 0-17.662-14.318-31.98-31.98-31.98-8.902 0-16.95 3.637-22.747 9.505z"
            p-id="5514"
            fill={color}
          ></path>
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
          background-color: red;
        }
        span:hover {
          background-color: #e81123;
        }
      `}</style>
    </>
  );
}, memoPropsAreEqual);

export default Wrap;
