import React from 'react';

export interface BaseHeaderProps {}

export const Header: React.FC<BaseHeaderProps> = ({ children }) => {
  return (
    <header key="Header" className="flex drag">
      {children}
    </header>
  );
};

export default Header;
