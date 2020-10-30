import React from 'react';
import { remote } from 'electron';

const Wrap: React.FC = () => {
  const __size__ = 16;
  const __color__ = '#666';
  const onFunc = () => {
    remote.getCurrentWindow().minimize();
  };
  return (
    <>
      <span onClick={onFunc}>
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6887" width={__size__} height={__size__}>
          <path d="M128 512h768a25.6 25.6 0 1 1 0 51.2h-768a25.6 25.6 0 1 1 0-51.2z" p-id="6888" fill={__color__}></path>
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
};

export default Wrap;
