import { Button, Input, InputNumber, Select } from 'antd';

import { BaseFormItemProps } from 'RenderProcess/components/Form';
import { Marriage } from 'RenderProcess/pages/Main/FormPreview/FormItemWrap';
import React from 'react';

interface InitialValueProps {
  userName: string;
  userSex: '0' | '1' | '2';
  userAge: number;
  marriage: boolean;
}

export const Options = (dataSource?: InitialValueProps): BaseFormItemProps[] => {
  return [
    {
      key: 'userName',
      name: 'userName',
      label: '姓名',
      initialValue: dataSource?.userName || '张三',
      rules: [{ required: true }],
      wrap: <Input style={{ width: 120 }} placeholder="请输入姓名" />
    },
    {
      key: 'userSex',
      name: 'userSex',
      label: '性别',
      rules: [{ required: true, type: 'string' }],
      initialValue: dataSource?.userSex || '0',
      wrap: (
        <Select style={{ width: 120 }}>
          <Select.Option value="0">男</Select.Option>
          <Select.Option value="1">女</Select.Option>
          <Select.Option value="2">未知</Select.Option>
        </Select>
      )
    },
    {
      key: 'userAge',
      name: 'userAge',
      label: '年龄',
      rules: [{ required: true, type: 'number' }],
      initialValue: dataSource?.userAge || 18,
      wrap: <InputNumber style={{ width: 120 }} placeholder="请填写年龄" />
    },
    {
      key: 'marriage',
      name: 'marriage',
      label: '婚姻状况',
      rules: [{ required: true, type: 'boolean' }],
      initialValue: !!dataSource?.marriage,
      wrap: <Marriage />,
      render: (formInstance) => {
        return formInstance.getFieldValue('userAge') >= 18;
      }
    },
    {
      key: 'submit',
      wrap: (
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      )
    }
  ];
};

export default Options;
