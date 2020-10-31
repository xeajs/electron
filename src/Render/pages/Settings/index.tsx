import AppLayout from '@/Render/layout/AppLayout';
import React from 'react';
import ScrollTools from '@/Render/components/ScrollTools';
import { SettingOptions } from './Options';

const Wrap: React.FC = () => {
  return (
    <AppLayout>
      <ScrollTools source={SettingOptions} isFullScreen></ScrollTools>
    </AppLayout>
  );
};

export default Wrap;
