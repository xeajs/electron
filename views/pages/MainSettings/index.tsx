import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
export default () => {
  const history = useHistory();
  return (
    <div>
      <Button onClick={() => history.push('/')}>返回</Button>
    </div>
  );
};
