import { Button, Tag } from 'antd';

import React from 'react';
import SystemController from '@views/components/SystemController';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <section className="ui-vw-100 ">
      <div className="flex just-center">
        <div className="flex-col">
          <br />
          <br />
          <Tag style={{ textAlign: 'center' }} color="cyan">
            关于软件
          </Tag>
          <br />
          <br />
          <Button type="dashed" onClick={() => history.push('/')}>
            返回首页
          </Button>
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <SystemController os="darwin" />
        <SystemController os="win32" />
      </div>
    </section>
  );
};

export default Wrap;
