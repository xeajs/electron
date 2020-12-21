import { SettingOutlined, UserOutlined } from '@ant-design/icons';

import Layout from '@/Render/layout';
import React from 'react';
import ScrollTools from '@/Render/components/ScrollTools';
import SettingAbout from './About';
import SettingNavigator from './Navigator';

const SettingWrap: React.FC = () => {
  return (
    <Layout>
      <ScrollTools
        source={[
          {
            Key: 'SettingsUser',
            Label: (
              <React.Fragment>
                <UserOutlined size={18} />
                <span>导航预览</span>
              </React.Fragment>
            ),
            Content: <SettingNavigator />
          },
          {
            Key: 'SettingsOther',
            Label: (
              <React.Fragment>
                <SettingOutlined size={18} />
                <span>关于</span>
              </React.Fragment>
            ),
            Content: <SettingAbout />
          }
        ]}
        isFullScreen
      ></ScrollTools>
    </Layout>
  );
};

export default SettingWrap;
