import LayoutMain from 'RenderProcess/layout/Main';
import React from 'react';
import { SwitchViewMain } from 'RenderProcess/routes/SwitchView';

export default (props) => {
  return (
    <LayoutMain {...props}>
      <SwitchViewMain />
    </LayoutMain>
  );
};
