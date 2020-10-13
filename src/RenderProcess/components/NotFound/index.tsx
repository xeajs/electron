import { Button } from 'antd';
import Icons from 'RenderProcess/assets/img/notfound.svg';
import React from 'react';
import { useHistory } from 'react-router';

export default () => {
  const history = useHistory();
  return (
    <section className="notfound drag ui-vw-100 ui-vh-100 flex just-center align-center">
      <section className="ui-h-100 flex-col just-center ui-pr-60 no-drag">
        <h1 className="title">404</h1>
        <p className="sub-title">灯红酒绿迷乱了我前进的方向</p>
        <Button style={{ width: 100 }} type="primary" onClick={() => history.replace('/')}>
          去往首页
        </Button>
        <br />
        <Button style={{ width: 100, marginLeft: -15, fontWeight: 600 }} onClick={() => history.goBack()} type="link">
          或者 返回上一页
        </Button>
      </section>
      <section className="ui-h-100 flex-col just-center ui-pl-60">
        <img src={Icons} alt="Not Found" />
      </section>
      <style jsx>{`
        .notfound {
          user-select: none;
        }
        .title {
          font-size: 40px;
          font-weight: 600;
          color: #646464;
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .sub-title {
          font-size: 16px;
          color: #999;
        }
      `}</style>
    </section>
  );
};
