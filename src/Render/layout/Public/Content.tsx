import React from 'react';

export interface BaseContentProps {}

export const Content: React.FC = ({ children }) => {
  return <section className="flex-1 ui-ov-h">{children}</section>;
};

export default Content;
