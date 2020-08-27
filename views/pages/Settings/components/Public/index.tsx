import { Button, Form, message } from 'antd';
import { OpenDialogReturnValue, remote } from 'electron';
import React, { useState } from 'react';

export default () => {
  const [workPath, setWorkPath] = useState($$.AppInfo.WorkPath);
  const [isClear, setIsClear] = useState(false);
  return (
    <div>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
        <Form.Item label="工作目录">
          <Button type="ghost" size="small" style={{ marginRight: '16px' }}>
            {workPath}
          </Button>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              $$.dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['openDirectory'] }).then((values: OpenDialogReturnValue) => {
                if (values.filePaths.length) setWorkPath(values.filePaths[0]);
              });
            }}
          >
            更改目录
          </Button>
        </Form.Item>
        <Form.Item label="工作目录">
          <Button type="ghost" size="small" style={{ marginRight: '16px' }}>
            {workPath}
          </Button>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              remote.shell.showItemInFolder($$.AppInfo.WorkSettingPath);
            }}
          >
            打开目录
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
