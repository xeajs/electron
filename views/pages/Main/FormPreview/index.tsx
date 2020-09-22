import { Button, Input, InputNumber, Modal, Select, Switch } from 'antd';
import Form, { BaseFormItemProps } from '@views/components/Form';

import React from 'react';
import { useHistory } from 'react-router';

/** 自定义组件 */
const Marriage: React.FC<{ value?: boolean; onChange?: (value: boolean) => void }> = (props) => {
  return <Switch checkedChildren="已婚" unCheckedChildren="未婚" checked={!!props.value} onChange={props.onChange} />;
};

const mapSource: BaseFormItemProps[] = [
  {
    key: 'userName',
    name: 'userName',
    label: '姓名',
    rules: [{ required: true }],
    wrap: <Input style={{ width: 120 }} placeholder="请输入姓名" />,
    render() {
      return true;
    }
  },
  {
    key: 'userSex',
    name: 'userSex',
    label: '性别',
    rules: [{ required: true, type: 'string' }],
    initialValue: '0',
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
    initialValue: 18,
    wrap: <InputNumber style={{ width: 120 }} placeholder="请填写年龄" />
  },
  {
    key: 'marriage',
    name: 'marriage',
    label: '婚姻状况',
    rules: [{ required: true, type: 'boolean' }],
    initialValue: false,
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

const Wrap: React.FC = () => {
  const history = useHistory();
  const onFinish = (values) => {
    Modal.success({
      title: '提交成功',
      okText: '返回首页',
      content: '问卷调查已提交完成，感谢您的参与！',
      onOk: () => {
        history.push('/');
      }
    });
  };
  return (
    <section className="ui-p-20">
      <h1 className="ui-ta-c ui-p-10 f20">问卷调查</h1>
      <Form layout="inline" mapSource={mapSource} onFinish={onFinish} />
    </section>
  );
};

export default Wrap;
