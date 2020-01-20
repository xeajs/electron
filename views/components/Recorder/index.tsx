/**
 * 录音模块
 */
import * as React from 'react';

import AudioRecordTypes from '~/public/plugins/node/AudioRecord';
import NodeRequire from '@/components/NodeRequire';
import { RecorderStore } from '@/store';

interface RecorderProps {
  RecorderStore: RecorderStore;
}
interface RecorderState {
  AudioRecordInstance: typeof AudioRecordTypes;
}

export default class Loading extends React.Component<RecorderProps, RecorderState> {
  constructor(props) {
    super(props);
    this.state = {
      AudioRecordInstance: NodeRequire('AudioRecord.node')
    };
  }
  componentDidMount() {
    this.taskGetDeviceSeqNo();
  }

  /** 实时同步麦克风状态和信息 */
  taskGetDeviceSeqNo() {
    const { RecorderStore } = this.props;
    setInterval(() => {
      const DeviceSeqNoString = this.getDeviceSeqNo();
      if (RecorderStore.DeviceSeqNo !== DeviceSeqNoString) {
        RecorderStore.updateDeviceSeqNo(DeviceSeqNoString);
      }
    }, 600);
  }
  /** 获取麦克风编码 [speakin_v22_19_36393430343751050036005a] */
  getDeviceSeqNo(): string {
    const { AudioRecordInstance } = this.state;
    const ret = AudioRecordInstance.getMomoAudioDevice()['ret'];
    let deviceList = AudioRecordInstance.listUsbDeviceName();
    let DeviceSeqNoString = '';
    if (Array.isArray(deviceList)) {
      let deviceString =
        deviceList.find((d) => {
          return (
            d
              .toString()
              .toLowerCase()
              .indexOf('speakin') > -1
          );
        }) || '';
      if (ret !== 0 || !deviceString) {
        DeviceSeqNoString = '';
      } else {
        DeviceSeqNoString = deviceString.replace(/\./g, '_');
      }
    }
    return DeviceSeqNoString;
  }
  render() {
    return <h1 style={{ display: 'none' }}>录音模块，基于nwjs前端调用node模块调用第三方插件（c++）进行录音</h1>;
  }
}
