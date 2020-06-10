import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'antd';
import SettingsOther from './components/Other';
import SettingsPublic from './components/Public';
import SettingsScroll from '@views/layout/SettingsScroll';
import SettingsUser from './components/User';
import { remote } from 'electron';
import { useHistory } from 'react-router';
import utils from '@views/utils';

export default () => {
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
        <Button onClick={() => history.push('/')}>返回 {innerHeight}</Button>
        <SettingsScroll
          height={innerHeight - 60}
          source={[
            {
              title: '通用设置',
              Wrap: <SettingsPublic />
            },
            {
              title: '用户设置',
              Wrap: <SettingsUser />
            },
            {
              title: '其他设置',
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
      `}</style>
    </>
  );
};
