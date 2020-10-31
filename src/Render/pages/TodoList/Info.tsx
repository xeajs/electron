import { Button, Skeleton } from 'antd';

import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Button size="small" type="primary" onClick={() => history.push('/todo/list')}>
        返回
      </Button>

      <Skeleton active></Skeleton>
    </div>
  );
};

export default Wrap;
