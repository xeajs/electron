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
      <div className="logo flex-col just-center align-center">
        <img src={logo} alt="" />
        <h1 className="ui-pt-10">xeajs</h1>
      </div>
      <ul className="inner flex-col no-drag">
        <li>
          <span>用户名</span>
          <Input style={{ width: 210 }} />
        </li>
        <li>
          <span>密码</span>
          <Input.Password style={{ width: 210 }} size="middle" />
        </li>
        <li>
          <Button type="primary" size="small" style={{ width: 128, height: 32 }} onClick={() => history.replace('/')}>
            登录
          </Button>
          <Button type="dashed" size="small" style={{ width: 64, height: 32 }} onClick={() => remote.getCurrentWindow().close()}>
            退出
          </Button>
        </li>
      </ul>
      <style jsx>{`
        .logo {
          height: 200px;
        }
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
