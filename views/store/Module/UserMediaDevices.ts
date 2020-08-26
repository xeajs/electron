import { action, observable, runInAction } from 'mobx';

/** 麦克风 */
interface MediaDeviceAudioinput {
  readonly deviceId: string;
  readonly groupId: string;
  readonly kind: 'audioinput';
  readonly label: string;
}
/** 耳机、音箱 */
interface MediaDeviceAudiooutput {
  readonly deviceId: string;
  readonly groupId: string;
  readonly kind: 'audiooutput';
  readonly label: string;
}
/** 摄像头 */
interface MediaDeviceVideoinput {
  readonly deviceId: string;
  readonly groupId: string;
  readonly kind: 'videoinput';
  readonly label: string;
}

export default class {
  @observable public AudioInputList: MediaDeviceAudioinput[];
  @observable public AudioOutputList: MediaDeviceAudiooutput[];
  @observable public VideoInputList: MediaDeviceVideoinput[];

  public constructor() {
    this.AudioInputList = [];
    this.AudioOutputList = [];
    this.VideoInputList = [];
    navigator.mediaDevices.ondevicechange = (e) => {
      this.GetUserMediaDevices();
    };
    this.GetUserMediaDevices();
  }
  @action protected async GetUserMediaDevices() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const AudioInputList: MediaDeviceAudioinput[] = [];
        const AudioOutputList: MediaDeviceAudiooutput[] = [];
        const VideoInputList: MediaDeviceVideoinput[] = [];
        const _deviceInfos = JSON.parse(JSON.stringify(deviceInfos));
        for (const item of _deviceInfos) {
          item.label = item.label.replace('Default - ', '').replace('Communications - ', '');
          switch (item.kind) {
            case 'audioinput':
              (() => {
                if (AudioInputList.find((key) => key.label === item.label)) return;
                AudioInputList.push(item as MediaDeviceAudioinput);
              })();
              break;
            case 'audiooutput':
              (() => {
                if (AudioOutputList.find((key) => key.label === item.label)) return;
                AudioOutputList.push(item as MediaDeviceAudiooutput);
              })();
              break;
            case 'videoinput':
              (() => {
                if (VideoInputList.find((key) => key.label === item.label)) return;
                VideoInputList.push(item as MediaDeviceVideoinput);
              })();
              break;
            default:
              console.warn('Found one other kind of source/device: ', item);
              break;
          }
        }
        return { AudioInputList, AudioOutputList, VideoInputList };
      })
      .then(({ AudioInputList, AudioOutputList, VideoInputList }) => {
        runInAction(() => {
          this.AudioInputList = AudioInputList;
          this.AudioOutputList = AudioOutputList;
          this.VideoInputList = VideoInputList;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.AudioInputList = [];
          this.AudioOutputList = [];
          this.VideoInputList = [];
        });
        console.error('获取设备信息失败', err);
      });
  }
}
