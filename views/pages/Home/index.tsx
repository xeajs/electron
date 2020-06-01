import { Button } from 'antd';
import React from 'react';
import { WarpProps } from '@views/components/Warp';

const Wrap: React.FC<{} & WarpProps> = (props) => {
  return (
    <div>
      home
      <Button
        onClick={() => {
          props.history.push('/');
        }}
      >
        返回首页
      </Button>
    </div>
  );
};

export default Wrap;
