import * as React from 'react';

import { Divider, Icon, Layout } from 'antd';

import { History } from 'history';
import ImageLogo from '@/assets/img/header/logoImg.png';
import WinControls from '@/components/WindowControls';
import styles from './index.module.css';

const { Header } = Layout;

interface BaseProps {
  history: History;
}

export const HeaderWrap: React.FC<BaseProps> = (props) => {
  const setting = () => {
    props.history.push('/main/settings');
  };
  const home = () => {
    props.history.push('/');
  };

  return (
    <Header className={`drag flex color-fff ${styles.bgc} ${styles.mainHeader}`} onDoubleClick={() => {}}>
      <div className="f24 flex align-center just-center cursor no-drag">
        <img onClick={() => home()} width="20" src={ImageLogo} alt="" />
      </div>
      <div className="flex-1 flex just-center align-center">{props.children || null}</div>
      <div className="f28 flex align-center no-drag">
        <span className={styles.systemButtons} onClick={() => setting()}>
          <Icon type="setting" />
        </span>
        <Divider
          style={{ width: 0, borderRight: '1px solid #50ADFF', borderLeft: '1px solid #0050B5' }}
          type="vertical"
        />
        <WinControls />
      </div>
    </Header>
  );
};
