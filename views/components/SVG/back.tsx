import React from 'react';
export default (props: { width?: number; height?: number; color?: string }): React.ReactElement => {
  const width = props.width || 18;
  const height = props.height || 18;
  const color = props.color || '#666';
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="10803"
      width={width}
      height={height}
    >
      <path
        d="M930.850995 459.349873l-639.197984 0 293.4044-293.400307-73.349565-73.350588L92.559581 511.748267l419.149289 419.143149 73.349565-73.350588L291.654035 564.139497l639.197984 0L930.852018 459.349873 930.850995 459.349873 930.850995 459.349873zM930.850995 459.349873"
        p-id="10804"
        fill={color}
      ></path>
    </svg>
  );
};
