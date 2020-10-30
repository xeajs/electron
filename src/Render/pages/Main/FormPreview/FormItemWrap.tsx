import React from 'react';
import { Switch } from 'antd';

/**
 * @自定义组件 {Switch}
 *
 * */
const Marriage: React.FC<{ value?: boolean; onChange?: (value: boolean) => void }> = (props) => {
  return <Switch checkedChildren="已婚" unCheckedChildren="未婚" checked={!!props.value} onChange={props.onChange} />;
};

export { Marriage };
