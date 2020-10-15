/**
 * 软件检测更新
 * @依赖 latest.yml、exe/app
 * 下載緩存地址 C:\Users\ASUS\AppData\Local\xeajs_electron_updater;
 */
import { UpdateCheckResult, UpdaterEvents, autoUpdater } from 'electron-updater';

import { AppEventNames } from 'typing/EventTypes';
import Config from '~/config';
import { app } from 'electron';

/** 控制重复更新 */
let cancelAutoUpdaterInstance: UpdateCheckResult | null = null;
let _cancelAutoUpdaterInstance: UpdateCheckResult | null = null;

app.on('before-quit', () => {
  autoUpdater.removeAllListeners();
  $$.Event.off(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate);
  $$.Event.off(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled);
  $$.Event.off(AppEventNames.AUTOUPDATER_ExtendQuitAndInstall);
});
app.on('ready', () => {
  if (Config.hotUpdaterUri) {
    autoUpdater.setFeedURL(Config.hotUpdaterUri);
  }
});

/** ==================== on =========================== */
$$.Event.on(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate, () => {
  if (cancelAutoUpdaterInstance) return;
  autoUpdater.checkForUpdates().then((value) => {
    /** 检测下载后注册取消下载事件 */
    _cancelAutoUpdaterInstance = value;
  });
});
$$.Event.on(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled, () => {
  $$.log.warn('软件更新、取消下载');
  cancelAutoUpdaterInstance?.cancellationToken?.cancel();
  _cancelAutoUpdaterInstance?.cancellationToken?.cancel();
  _cancelAutoUpdaterInstance = null;
  cancelAutoUpdaterInstance = null;
});
$$.Event.on(AppEventNames.AUTOUPDATER_ExtendQuitAndInstall, () => {
  autoUpdater.quitAndInstall();
});

/** ==================== emit =========================== */
autoUpdater.on('error' as UpdaterEvents, (error) => $$.Event.emit(AppEventNames.AUTOUPDATER_Error, error));
autoUpdater.on('checking-for-update' as UpdaterEvents, (info) => $$.Event.emit(AppEventNames.AUTOUPDATER_CheckingForUpdate, info));
autoUpdater.on('update-cancelled' as UpdaterEvents, (info) => $$.Event.emit(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled, info));
autoUpdater.on('update-available' as UpdaterEvents, (info) => $$.Event.emit(AppEventNames.AUTOUPDATER_UpdateAvailable, info));
autoUpdater.on('update-not-available' as UpdaterEvents, (info) => $$.Event.emit(AppEventNames.AUTOUPDATER_UpdateNotAvailable, info));
autoUpdater.on('update-downloaded' as UpdaterEvents, (info) => $$.Event.emit(AppEventNames.AUTOUPDATER_UpdateDownloaded, info));
autoUpdater.on('download-progress' as UpdaterEvents, (progress) => $$.Event.emit(AppEventNames.AUTOUPDATER_DownloadProgress, progress));

const clearInstallInstance = () => {
  cancelAutoUpdaterInstance?.cancellationToken?.cancel();
  cancelAutoUpdaterInstance = null;
};

/** 设置下载实例 */
autoUpdater.on('update-available', (info) => {
  cancelAutoUpdaterInstance = _cancelAutoUpdaterInstance;
});

/** 清理下载实例 */
autoUpdater.on('error', clearInstallInstance);
autoUpdater.on('update-cancelled', clearInstallInstance);
autoUpdater.on('update-downloaded', clearInstallInstance);
autoUpdater.on('update-not-available', clearInstallInstance);
$$.Event.on(AppEventNames.AUTOUPDATER_ExtendResetUpdaterInstance, clearInstallInstance);
