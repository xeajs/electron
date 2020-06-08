import LayoutMain from '@views/layout/Main';
import React from 'react';
import { SwitchViewMain } from '@views/routes/SwitchView';

export default (props) => {
  return (
    <LayoutMain {...props}>
      <SwitchViewMain />
    </LayoutMain>
  );
};
