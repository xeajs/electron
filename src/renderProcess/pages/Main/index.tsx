import LayoutMain from 'renderProcess/layout/Main';
import React from 'react';
import { SwitchViewMain } from 'renderProcess/routes/SwitchView';

export default (props) => {
  return (
    <LayoutMain {...props}>
      <SwitchViewMain />
    </LayoutMain>
  );
};
