import * as React from 'react';

import { Button } from 'antd';

interface BaseProps {
  disabled?: boolean;
  style?: React.CSSProperties;
  submit?: Function;
  ThanLayout: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
}

const SettingsButtongs: React.FC<BaseProps> = (props) => {
  return (
    <Button type="primary" onClick={(e) => props.submit && props.submit(e)}>
      提交
    </Button>
  );
};

export default SettingsButtongs;
