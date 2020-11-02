import * as React from 'react';

import { SettingOutlined, UserOutlined } from '@ant-design/icons';

import SettingAbout from './SettingAbout';
import SettingNavigator from './SettingNavigator';
import { SettingsDataSource } from '@/Render/components/ScrollTools';

export const SettingOptions: SettingsDataSource[] = [
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
];

export default SettingOptions;
