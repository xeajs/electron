import { BackwardOutlined, PicLeftOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';

import SettingsOther from './components/Other';
import SettingsPublic from './components/Public';
import SettingsScroll from '@views/layout/SettingsScroll';
import SettingsUser from './components/User';
import { Tag } from 'antd';
import { remote } from 'electron';
import { useHistory } from 'react-router';
import utils from '@views/utils';

const Wrap: React.FC = () => {
  const history = useHistory();
  const RefSettings = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  useEffect(() => {
    if (!RefSettings || !RefSettings.current) return;
    setInnerHeight(RefSettings.current.getBoundingClientRect().height);
    remote.getCurrentWindow().on(
      'resize',
      utils.debounce(() => {
        if (!RefSettings || !RefSettings.current) return;
        setInnerHeight(RefSettings.current.getBoundingClientRect().height);
      })
    );
  }, [RefSettings]);
  return (
    <>
      <div className="settings" ref={RefSettings}>
        <section className="header">
          <Tag icon={<BackwardOutlined size={18} />} color="#55acee" onClick={() => history.push('/')}>
            设置
          </Tag>
        </section>
        <SettingsScroll
          style={{ paddingLeft: '60px' }}
          height={innerHeight - 60}
          source={[
            {
              title: '通用设置',
              icon: <PicLeftOutlined size={18} />,
              Wrap: <SettingsPublic />
            },
            {
              title: '用户设置',
              icon: <UserOutlined size={18} />,
              Wrap: <SettingsUser />
            },
            {
              title: '其他设置',
              icon: <SettingOutlined size={18} />,
              Wrap: <SettingsOther />
            }
          ]}
        />
      </div>
      <style jsx>{`
        .settings {
          height: 100%;
          overflow: hidden;
        }
        .header {
          padding: 8px 30px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 24px;
        }
      `}</style>
    </>
  );
};

export default Wrap;
