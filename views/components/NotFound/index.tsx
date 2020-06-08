import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

export default () => {
  const history = useHistory();
  return (
    <section className="flex-col flex-1 just-center align-center" style={{ paddingTop: '100px' }}>
      <div>
        <Button>NotFound</Button>
        <Button style={{ marginLeft: '16px' }} type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      </div>
    </section>
  );
};
