import React from 'react';
export default (props: { width?: number; height?: number; color?: string }): React.ReactElement => {
  const width = props.width || 16;
  const height = props.height || 16;
  const color = props.color || '#c0c4cc';
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6887"
      width={width}
      height={height}
    >
      <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="6888" fill={color}></path>
    </svg>
  );
};
