import { Button, Tag } from 'antd';

import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <section className="ui-vw-100 flex just-center">
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
    </section>
  );
};

export default Wrap;
