import { BackwardOutlined, PicLeftOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import MainLayout from '@views/layout/Main';
import React from 'react';
import ScrollTools from '@views/components/ScrollTools';
import SettingsOther from './components/Other';
import SettingsPublic from './components/Public';
import SettingsUser from './components/User';
import { Tag } from 'antd';
import { useHistory } from 'react-router';

const Wrap: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <div className="settings">
        <section className="fullback">
          <Tag icon={<BackwardOutlined size={18} />} color="#1890ff" onClick={() => history.push('/')}>
            设置
          </Tag>
        </section>
        <section className="settingsInner">
          <ScrollTools
            source={[
              {
                Key: 'SettingsPublic',
                Label: (
                  <React.Fragment>
                    <PicLeftOutlined size={18} />
                    <span>通用设置</span>
                  </React.Fragment>
                ),
                Inner: <SettingsPublic />
              },
              {
                Key: 'SettingsUser',
                Label: (
                  <React.Fragment>
                    <UserOutlined size={18} />
                    <span>用户设置</span>
                  </React.Fragment>
                ),
                Inner: <SettingsUser />
              },
              {
                Key: 'SettingsOther',
                Label: (
                  <React.Fragment>
                    <SettingOutlined size={18} />
                    <span>其他设置</span>
                  </React.Fragment>
                ),
                Inner: <SettingsOther />
              }
            ]}
          ></ScrollTools>
        </section>
      </div>
      <style jsx>{`
        .settings {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .fullback {
          padding: 10px 10px 10px 18px;
          margin: 0 18px 0 0;
          border-bottom: 1px solid #f2f2f2;
        }
        .settingsInner {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </MainLayout>
  );
};

export default Wrap;
