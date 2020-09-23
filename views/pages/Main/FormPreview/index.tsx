import Form from '@views/components/Form';
import { Modal } from 'antd';
import React from 'react';
import mapSource from './FormItemData';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  const onFinish = () => {
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
      <Form layout="inline" mapSource={mapSource()} onFinish={onFinish} />
    </section>
  );
};

export default Wrap;
