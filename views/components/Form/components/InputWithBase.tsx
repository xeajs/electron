import * as React from 'react';

import { Input } from 'antd';

interface BaseProps {
  disabled?: boolean;
  style?: React.CSSProperties;
}

const InputWithBase: React.FC<BaseProps> = (props) => {
  return <Input {...props}></Input>;
};

export default InputWithBase;
