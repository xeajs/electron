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
      p-id="7442"
      width={width}
      height={height}
    >
      <path d="M832 832H192V192h640v640z m50-690H142v740h740V142z" p-id="7443" fill={color}></path>
    </svg>
  );
};
