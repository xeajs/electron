import { UpdateCheckResult, autoUpdater } from 'electron-updater';

/**
 * 软件检测更新
 * @依赖 latest.yml、exe/app
 * 下載緩存地址 C:\Users\ASUS\AppData\Local\xeajs_electron_updater;
 */
import { AppEventNames } from 'typing/EventTypes';
import Config from '~/config';

const UpdateMessage = {
  Err: { type: 'reject', message: '检查更新失败啦，请联系管理员！' },
  Checking: { type: 'pending', message: '正在检查更新...' },
  UpdateAva: { type: 'pending', message: '检测到新版本，正在下载...' },
  UpdateNotAva: { type: 'resolve', message: '当前已是最新版本！' },
  UpdateDone: { type: 'done', message: '软件下载成功，立即安装？' },

  CheckUpdate: { type: 'check', message: '' },
  Install: { type: 'install', message: '' }
};

const AutoUpdateListener = (hotUpdaterUri) => {
  autoUpdater.setFeedURL(hotUpdaterUri);
  autoUpdater.on('error', (error) => {
    $$.Event.emit(AppEventNames.HOT_UPDATE, UpdateMessage.Err);
    $$.log.error(`【热更】`, error);
  });
  autoUpdater.on('checking-for-update', () => {
    $$.Event.emit(AppEventNames.HOT_UPDATE, UpdateMessage.Checking);
  });
  autoUpdater.on('update-available', () => {
    $$.Event.emit(AppEventNames.HOT_UPDATE, UpdateMessage.UpdateAva);
  });
  autoUpdater.on('update-not-available', () => {
    $$.Event.emit(AppEventNames.HOT_UPDATE, UpdateMessage.UpdateNotAva);
  });
  /** 下载完成，立即更新 */
  autoUpdater.on('update-downloaded', () => {
    $$.Event.emit(AppEventNames.HOT_UPDATE, UpdateMessage.UpdateDone);
  });
  /** 更新下载进度事件 */
  autoUpdater.on('download-progress', (progress) => {
    $$.Event.emit(AppEventNames.HOT_UPDATE_PROGRESS, progress);
  });
};

if (Config.hotUpdaterUri) {
  AutoUpdateListener(Config.hotUpdaterUri);
}

/** 取消下载事件 */
let cancelAutoUpdaterInstance: UpdateCheckResult | null = null;
const cancelAutoUpdater = () => {
  cancelAutoUpdaterInstance?.cancellationToken?.cancel();
  cancelAutoUpdaterInstance = null;
  $$.log.warn('软件更新、取消下载');
};

$$.Event.on(AppEventNames.HOT_UPDATE, (args: typeof UpdateMessage.Err) => {
  switch (args.type) {
    /** 开始检测下载 */
    case 'check':
      autoUpdater.checkForUpdates().then((value) => {
        /** 检测下载后注册取消下载事件 */
        cancelAutoUpdaterInstance = value;
        /** 取消下载事件 */
        $$.Event.off(AppEventNames.CANCEL_HOT_UPDATE, cancelAutoUpdater);
        $$.Event.once(AppEventNames.CANCEL_HOT_UPDATE, cancelAutoUpdater);
      });
      break;
    /** 下载成功立即安装 */
    case 'install':
      autoUpdater.quitAndInstall();
      break;
  }
});
