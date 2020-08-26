import { Button, Tag } from 'antd';

import React from 'react';
import { UserMediaDevices } from '@views/store';
import { useHistory } from 'react-router';
import { useInject } from '@views/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap: React.FC = () => {
  const { userMediaDevices } = useInject<{ userMediaDevices: UserMediaDevices }>('userMediaDevices');
  const history = useHistory();
  return useObserver(() => (
    <section className="ui-v-100 ui-v-100 flex-col just-center">
      <section className="ui-pl-14 ui-pt-14 ui-pb-14">
        <Button onClick={() => history.goBack()}>返回首页</Button>
      </section>
      <section className="flex ui-pt-20 align-start">
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">麦克风</span>
          {userMediaDevices.AudioInputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
        </section>
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">摄像头</span>
          {userMediaDevices.VideoInputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
        </section>
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">耳机、音响功放</span>
          {userMediaDevices.AudioOutputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
        </section>
      </section>
    </section>
  ));
};

export default Wrap;
