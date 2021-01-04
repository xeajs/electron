/**
 * 软件检测更新
 * @依赖 latest.yml、exe/app
 * 下載緩存地址 C:\Users\ASUS\AppData\Local\xeajs_electron_updater;
 */
import { UpdateCheckResult, autoUpdater } from 'electron-updater';
import { onDownloadProgressTypes, onUpdaterTypes } from '@/Typing/AutoUpdater';

import Config from '~/config';
import { app } from 'electron';

export default () => {
  if (!Config.hotUpdater) {
    return;
  }
  app.on('ready', () => {
    if (Config.plugins.hotUpdater) {
      autoUpdater.setFeedURL(Config.plugins.hotUpdater);
    }
  });

  const _set = (key, val) => {
    Reflect.set(global['AUTO_updater'], key, val);
  };
  const _get = (key) => {
    return Reflect.get(global['AUTO_updater'], key);
  };
  let _onUpdater: onUpdaterTypes = () => {};
  let _onDownloadProgress: onDownloadProgressTypes = () => {};

  Reflect.set(global, 'AUTO_updater', {
    cacheDir: '',
    updateCheckResult: null,
    isDownloadIng: false,
    onUpdater: (callback: onUpdaterTypes) => {
      _onUpdater = callback;
    },
    onDownloadProgress: (callback: onDownloadProgressTypes) => {
      _onDownloadProgress = callback;
    },
    quitAndInstall: () => {
      autoUpdater.quitAndInstall();
    },
    checkForUpdates: () => {
      if (_get('isDownloadIng')) return;
      autoUpdater.checkForUpdates().then((value) => {
        _set('updateCheckResult', value);
      });
    },
    cancel: () => {
      const cancelValue: Partial<UpdateCheckResult> = _get('updateCheckResult');
      cancelValue?.cancellationToken?.cancel();
      _set('updateCheckResult', null);
    }
  });

  autoUpdater.on('error', (error) => {
    _onUpdater('error', error);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('checking-for-update', (args) => {
    _onUpdater('checking-for-update', args);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('update-cancelled', (args) => {
    _onUpdater('update-cancelled', args);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('update-available', (args) => {
    _onUpdater('update-available', args);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('update-not-available', (args) => {
    _onUpdater('update-not-available', args);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('update-downloaded', (args) => {
    _onUpdater('update-downloaded', args);
    _set('isDownloadIng', false);
  });
  autoUpdater.on('download-progress', (progress, args) => {
    _onDownloadProgress(progress);
    _set('isDownloadIng', true);
    try {
      if (!_get('cacheDir')) {
        _set('cacheDir', autoUpdater['downloadedUpdateHelper']?.cacheDir);
      }
    } catch (error) {
      $$.log.error(error);
    }
  });
};
