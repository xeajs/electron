import LayoutMain from '@/Render/layout/Main';
import React from 'react';
import { SwitchViewMain } from '@/Render/routes/SwitchView';

export default (props) => {
  return (
    <LayoutMain {...props}>
      <SwitchViewMain />
    </LayoutMain>
  );
};
