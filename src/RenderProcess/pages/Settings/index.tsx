import { PicLeftOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import MainLayout from 'RenderProcess/layout/Main';
import React from 'react';
import ScrollTools from 'RenderProcess/components/ScrollTools';
import SettingsOther from './components/Other';
import SettingsPublic from './components/Public';
import SettingsUser from './components/User';

const Wrap: React.FC = () => {
  return (
    <MainLayout>
      <div className="settings">
        <section className="settingsInner">
          <ScrollTools
            source={[
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
        .settingsInner {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </MainLayout>
  );
};

export default Wrap;
