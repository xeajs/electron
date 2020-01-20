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
      p-id="16676"
      width={width}
      height={height}
    >
      <path
        d="M255.13 382.7h425.11v382.65h-425.1l-0.01-382.65z m42.64 340.17l340.09-0.09V425.34H297.77v297.53z m382.46-85.1h42.64V340.32H382.7v42.38h-42.38v-85.02h425l0.04 382.47h-85.21l0.08-42.38z"
        p-id="16677"
        fill={color}
      ></path>
    </svg>
  );
};
