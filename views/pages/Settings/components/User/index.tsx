import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { Tag } from 'antd';
import head from '@views/assets/img/HeadPortrait/head.png';
import { useHistory } from 'react-router';

export default () => {
  const history = useHistory();
  return (
    <div>
      <section className="flex flex-col just-center align-center">
        <img src={head} width="168" alt="" />
        <h3 className="ui-pt-16">
          Xea pro &nbsp;&nbsp;
          <EditOutlined />
        </h3>
        <p>
          <Tag color="orange">所在地址</Tag> 广东省 深圳市 南山区 &nbsp;&nbsp;
          <EditOutlined />
        </p>
        <p>
          <Tag color="gold">社交网络</Tag> 邮箱、微信、QQ、微博、GitHub &nbsp;&nbsp;
          <EditOutlined />
        </p>
        <p>
          <Tag color="cyan">个人介绍</Tag> 基于React + Typescript + Electron + Koa 实现的桌面APP开发模板 &nbsp;&nbsp;
          <EditOutlined />
        </p>
        <p>
          <Tag color="red" onClick={() => history.push('/login')}>
            退出登录
          </Tag>
        </p>
      </section>
    </div>
  );
};
