import { Button, Tag } from 'antd';

import { BackwardOutlined } from '@ant-design/icons';
import Header from 'renderProcess/components/Header';
import React from 'react';
import SystemController from 'renderProcess/components/SystemController';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <section className="ui-vw-100 ui-pt-80">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <SystemController os="darwin" />
        <SystemController os="win32" />
      </div>
      <section>
        <br />
        <Header os="darwin"></Header>
        <br />
        <Header os="win32"></Header>
      </section>
      <section className="ui-pl-14 ui-pt-14 ui-pb-14 flex just-center align-center">
        <Button icon={<BackwardOutlined size={18} />} type="primary" onClick={() => history.goBack()}>
          返回首页
        </Button>
      </section>
    </section>
  );
};

export default Wrap;
