import { Button, Form, Tag, message } from 'antd';

import { AppEventNames } from '@/Types/EventTypes';
import React from 'react';
import pkg from '~/package.json';
import { shell } from 'electron';

export default () => {
  return (
    <div>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
        <Form.Item label="软件更新">
          <Tag>
            当前版本 {pkg.version}（Build:{pkg.version.split('.')[2]}）
          </Tag>
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
        <Form.Item label="Code">
          <Button
            type="link"
            style={{ marginRight: '16px' }}
            onClick={() => {
              shell.openExternal('https://gitee.com/xieyejiang/electron');
            }}
          >
            Gitee
          </Button>
          <Button
            type="link"
            style={{ marginRight: '16px' }}
            onClick={() => {
              shell.openExternal('https://github.com/xeajs/electron');
            }}
          >
            Github
          </Button>
        </Form.Item>
      </Form>
      <p className="ui-ta-c f12">@Copyright 2019 - {new Date().getFullYear()}</p>
    </div>
  );
};
