import React from 'react';
import { Skeleton } from 'antd';
import SystemController from '@/Render/components/SystemController';

const Wrap: React.FC = () => {
  return (
    <section className="flex-col ui-pt-40">
      <section className="ui-mb-40">
        <SystemController />
        <Skeleton active></Skeleton>
      </section>
      <section>
        <SystemController os="win32" />
        <Skeleton active></Skeleton>
      </section>
    </section>
  );
};

export default Wrap;
