import { Button, Skeleton } from 'antd';

import React from 'react';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Skeleton active></Skeleton>
      <div className="flex just-center">
        <Button size="small" type="primary" onClick={() => history.push('/todo/list')}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default Wrap;
