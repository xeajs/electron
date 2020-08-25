import { Button, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { remote } from 'electron';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export default () => {
  const [downloadPath, setDownloadPath] = useState(remote.app.getPath('userData'));
  const [workPath, setWorkPath] = useState(remote.app.getPath('userData'));
  const [isClear, setIsClear] = useState(false);
  useEffect(() => {}, []);
  return (
    <div>
      <Form {...layout} name="basic" initialValues={{ remember: true }}>
        <Form.Item label="下载目录">
          <Button type="ghost" size="small" style={{ marginRight: '16px' }}>
            {downloadPath}
          </Button>
          <Button type="dashed" size="small" onClick={() => {}}>
            更改目录
          </Button>
        </Form.Item>
        <Form.Item label="工作目录">
          <Button type="ghost" size="small" style={{ marginRight: '16px' }}>
            {workPath}
          </Button>
          <Button type="dashed" size="small" onClick={() => {}}>
            更改目录
          </Button>
        </Form.Item>
        <Form.Item label="缓存设置">
          <Button
            type="dashed"
            size="small"
            loading={isClear}
            disabled={isClear}
            onClick={() => {
              setIsClear(true);
              setTimeout(() => {
                setIsClear(false);
                message.success('清理完成');
              }, 5000);
            }}
          >
            清理缓存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
