import { Button, Result } from 'antd';

import Layout from '@/Render/layout';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();
  return (
    <Layout>
      <div className="ui-h-100 flex just-center align-center">
        <Result
          icon={<SmileOutlined />}
          title="Hello Word！"
          extra={
            <React.Fragment>
              <Button type="primary" onClick={() => {}}>
                欢迎您！
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  history.push('/');
                }}
              >
                返回首页
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  history.push('/settings');
                }}
              >
                去设置
              </Button>
            </React.Fragment>
          }
        />
      </div>
    </Layout>
  );
};

export default Wrap;
