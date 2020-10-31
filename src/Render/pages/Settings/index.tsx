import MainLayout from '@/Render/layout/Main';
import React from 'react';
import ScrollTools from '@/Render/components/ScrollTools';
import { SettingOptions } from './Options';

const Wrap: React.FC = () => {
  return (
    <MainLayout>
      <ScrollTools source={SettingOptions} isFullScreen></ScrollTools>
    </MainLayout>
  );
};

export default Wrap;
