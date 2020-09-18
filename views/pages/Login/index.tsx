import { Button, Input } from 'antd';
import React, { useEffect } from 'react';

import logo from '~/public/assets/favicon/png/favicon@3x.png';
import pkg from '~/package.json';
import { remote } from 'electron';
import { useHistory } from 'react-router';

export default () => {
  const history = useHistory();
  useEffect(() => {
    const CurrentWindow = remote.getCurrentWindow();
    CurrentWindow.setSize(300, 450, false);
    CurrentWindow.center();
    CurrentWindow.setResizable(false);
    return () => {
      CurrentWindow.setResizable(true);
      CurrentWindow.setSize(pkg.window.width, pkg.window.height, false);
      CurrentWindow.center();
    };
  }, []);
  return (
    <section className="drag ui-vw-100 ui-vh-100 user-login flex-col just-center align-center ui-ov-h">
      <div className="flex-col just-center align-center bg-000">
        <img src={logo} width="48" alt="" />
        <h1 className="ui-pt-10 ui-w-100 f20">登录 Xea Pro</h1>
        <br />
      </div>

      <ul className="inner flex-col no-drag">
        <li>
          <span>用户名</span>
          <Input placeholder="请输入用户名" style={{ width: 210 }} />
        </li>
        <li>
          <span>密码</span>
          <Input.Password placeholder="请输入密码" style={{ width: 210 }} size="middle" />
        </li>
        <li>
          <Button type="primary" size="small" style={{ width: 98, height: 32 }} onClick={() => history.replace('/')}>
            登录
          </Button>
          <Button type="dashed" size="small" style={{ width: 64, height: 32 }} onClick={() => remote.getCurrentWindow().close()}>
            退出
          </Button>
        </li>
      </ul>
      <p className="f12">
        登录即代表已阅读并同意<span style={{ color: 'blue' }}>服务协议</span>和<span style={{ color: 'blue' }}>隐私政策</span>
      </p>
      <p className="f12">
        还没有账号？<span style={{ color: 'green' }}>立即注册</span>
      </p>
      <style jsx>{`
        .user-login {
          background-color: #f9f9f9;
        }
        .inner {
          width: 100%;
        }
        .inner > li {
          padding: 6px 0;
        }
        .inner > li:last-child {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 40px;
        }
        .inner > li > span {
          width: 75px;
          text-align: right;
          padding-right: 8px;
          display: inline-block;
        }
      `}</style>
    </section>
  );
};
