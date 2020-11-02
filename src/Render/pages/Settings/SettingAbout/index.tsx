import { Button, Form, message } from 'antd';
import { OpenDialogReturnValue, remote, shell } from 'electron';
import React, { useState } from 'react';

import { AppEventNames } from '@/Types/EventTypes';

export default () => {
  const [workPath, setWorkPath] = useState($$.AppInfo.WorkPath);
  return (
    <div>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="版本信息">
          当前版本 {$$.AppInfo.versions.appVersion}（Build:{$$.AppInfo.versions.build}）
          <Button
            type="dashed"
            size="small"
            style={{ marginRight: '16px' }}
            onClick={() => {
              $$.Event.emit(AppEventNames.AUTOUPDATER, null);
            }}
          >
            检查更新
          </Button>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              message.success('反馈成功！');
            }}
          >
            意见反馈
          </Button>
        </Form.Item>
        <Form.Item label="获取其他客户端">
          <Button
            type="primary"
            size="small"
            shape="round"
            style={{ marginRight: '16px', marginLeft: '16px' }}
            onClick={() => {
              message.success('敬请期待！');
            }}
          >
            Android
          </Button>
          <Button
            type="primary"
            size="small"
            shape="round"
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('敬请期待！');
            }}
          >
            IPhone
          </Button>
          <Button
            type="primary"
            size="small"
            shape="round"
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('敬请期待！');
            }}
          >
            iPad
          </Button>
          <Button
            type="primary"
            size="small"
            shape="round"
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('敬请期待！');
            }}
          >
            Windows
          </Button>
          <Button
            type="primary"
            size="small"
            shape="round"
            style={{ marginRight: '16px' }}
            onClick={() => {
              message.success('敬请期待！');
            }}
          >
            Mac
          </Button>
        </Form.Item>
        <Form.Item label="软件存储目录">
          <Button type="ghost" size="small" style={{ marginRight: '16px' }}>
            {workPath}
          </Button>
          <Button
            disabled
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
          <Button
            className="ui-ml-16"
            type="dashed"
            size="small"
            onClick={() => {
              remote.shell.showItemInFolder($$.AppInfo.WorkSettingPath);
            }}
          >
            打开目录
          </Button>
        </Form.Item>
        <Form.Item label="其他资源">
          <Button
            type="link"
            style={{ marginRight: '16px' }}
            onClick={() => {
              shell.openExternal('https://gitee.com/xieyejiang/electron');
            }}
          >
            Gitee 仓库
          </Button>
          <Button
            type="link"
            style={{ marginRight: '16px' }}
            onClick={() => {
              shell.openExternal('https://github.com/xeajs/electron');
            }}
          >
            Github 仓库
          </Button>
          <Button
            type="link"
            style={{ marginRight: '16px' }}
            onClick={() => {
              shell.openExternal('https://xeajs.gitee.io/docs/');
            }}
          >
            操作文档
          </Button>
        </Form.Item>
      </Form>
      <p className="ui-ta-c f12 ui-pt-40">@Copyright 2019 - {new Date().getFullYear()}</p>
    </div>
  );
};
