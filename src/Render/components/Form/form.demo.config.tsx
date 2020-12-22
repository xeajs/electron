import { BaseFormItemProps } from '@/Render/components/Form';
import { Input } from 'antd';
import React from 'react';

interface FormFieldTypes {
  userName: string;
  userPassword: string;
  usserPassword: string;
}

export default (fieldObject?: Partial<FormFieldTypes>): BaseFormItemProps<FormFieldTypes>[] => {
  return [
    {
      field: 'userName',
      initialValue: fieldObject?.userName,
      render: ({ getFieldsValue }) => {
        return <Input disabled={getFieldsValue().userPassword === '000'} />;
      }
    },
    {
      field: 'userPassword',
      initialValue: fieldObject?.userPassword,
      render: (formInstance) => <Input.Password />
    },
    {
      field: 'usserPassword',
      initialValue: fieldObject?.usserPassword,
      render: ({ getFieldsValue }) => {
        if (getFieldsValue().userName === 'norender') return null;
        return <Input.Password />;
      }
    }
  ];
};
