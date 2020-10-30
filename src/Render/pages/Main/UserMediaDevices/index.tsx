import { Button, Empty, Tag } from 'antd';

import { BackwardOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { useInject } from '@/Render/components/Hooks';
import { useObserver } from 'mobx-react';

const Wrap: React.FC = () => {
  const { MediaDevices } = useInject('MediaDevices');
  const history = useHistory();
  return useObserver(() => (
    <section className="ui-v-100 ui-v-100 flex-col just-center">
      <section className="flex ui-pt-20 align-start">
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">麦克风</span>
          {MediaDevices.AudioInputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
          {!MediaDevices.AudioInputList.length && <Empty description="没有可用设备" />}
        </section>
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">摄像头</span>
          {MediaDevices.VideoInputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
          {!MediaDevices.VideoInputList.length && <Empty description="没有可用设备" />}
        </section>
        <section className="flex-1 flex-col just-center align-center">
          <span className="ui-pt-4 ui-pb-4">耳机、音响功放</span>
          {MediaDevices.AudioOutputList.map((item) => (
            <React.Fragment key={item.deviceId}>
              <Tag className="ui-mt-4" color="cyan">
                {item.label}
              </Tag>
              <br />
            </React.Fragment>
          ))}
          {!MediaDevices.AudioOutputList.length && <Empty description="没有可用设备" />}
        </section>
      </section>
      <section className="ui-pl-14 ui-pt-14 ui-pb-14 flex just-center align-center">
        <Button icon={<BackwardOutlined size={18} />} type="primary" onClick={() => history.goBack()}>
          返回首页
        </Button>
      </section>
    </section>
  ));
};

export default Wrap;
