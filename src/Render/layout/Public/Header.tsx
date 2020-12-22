import React from 'react';

export interface BaseHeaderProps {}

export const Header: React.FC<BaseHeaderProps> = ({ children }) => {
  return (
    <header key="Header" className="flex drag">
      {children}

      <style jsx>{`
        header {
          height: 38px;
          background-image: url(${require('@/Render/assets/img/Background/header.png').default});
          background-repeat: repeat-x;
          background-size: auto 100%;
        }
      `}</style>
    </header>
  );
};

export default Header;
