/**
 * AutoUpdater $$.Event.emit(AppEventNames.CHECK_HOT_UPDATE, null);
 */
import { Modal, Progress, Spin } from 'antd';
import React, { useEffect } from 'react';

import { AppEventNames } from 'typing/EventTypes';
import { ModalFuncProps } from 'antd/lib/modal';

interface DownloadProgress {
  bytesPerSecond: number;
  delta: number;
  percent: number;
  total: number;
  transferred: number;
}

let Updater: {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};
const _CheckAutoUpdater = () => {
  $$.Event.emit(AppEventNames.HOT_UPDATE, { type: 'check' });
};
const _AutoUpdaterInstall = () => {
  $$.Event.emit(AppEventNames.HOT_UPDATE, { type: 'install' });
};
const _AutoUpdaterCancelInstall = () => {
  $$.Event.emit(AppEventNames.CANCEL_HOT_UPDATE, null);
};

const destroy = () => Updater && Updater?.destroy();

export default (props) => {
  const checkUpdate = () => {
    Updater = Modal.confirm({
      /** ok */
      okButtonProps: { hidden: true },
      onOk: destroy,
      /** cancel */
      cancelButtonProps: { hidden: true },
      onCancel: destroy,
      title: '检查更新',
      centered: true,
      content: (
        <React.Fragment>
          <Spin />
          <span className="ui-ml-8">正在检测版本信息，请稍后！</span>
        </React.Fragment>
      )
    });
    _CheckAutoUpdater();
  };

  const onUpdaterStep = (message: { type: string; message: string }) => {
    switch (message.type) {
      case 'pending':
        (() => {
          Updater.update({
            content: (
              <React.Fragment>
                <Spin />
                <span className="ui-ml-8">{message.message}</span>
              </React.Fragment>
            )
          });
        })();
        break;
      case 'reject':
      case 'resolve':
        (() => {
          Updater.update({
            okButtonProps: { hidden: false },
            okText: '知道啦',
            content: (
              <React.Fragment>
                <span className="ui-ml-8">{message.message}</span>
              </React.Fragment>
            )
          });
        })();
        break;
      case 'done':
        (() => {
          Updater.update({
            okButtonProps: { hidden: false },
            okText: '立即安装',
            onOk: () => {
              _AutoUpdaterInstall();
            },
            cancelButtonProps: { hidden: false },
            cancelText: '取消安装',
            content: (
              <React.Fragment>
                <span className="ui-ml-8">{message.message}</span>
              </React.Fragment>
            )
          });
        })();
        break;
      default:
        break;
    }
  };
  const onUpdaterDownloadProgress = (progress: DownloadProgress) => {
    Updater?.update({
      title: '正在下载...',
      okButtonProps: { hidden: false },
      // cancelButtonProps: { hidden: false },
      okType: 'danger',
      okText: '取消下载',
      // cancelText: '后台下载',
      onOk: () => _AutoUpdaterCancelInstall(),
      content: <Progress percent={Math.floor(progress.percent * 100) / 100} size="small" status="active" />
    });
  };

  useEffect(() => {
    $$.Event.on(AppEventNames.CHECK_HOT_UPDATE, checkUpdate);
    $$.Event.on(AppEventNames.HOT_UPDATE, onUpdaterStep);
    $$.Event.on(AppEventNames.HOT_UPDATE_PROGRESS, onUpdaterDownloadProgress);
    return () => {
      $$.Event.off(AppEventNames.CHECK_HOT_UPDATE, checkUpdate);
      $$.Event.off(AppEventNames.HOT_UPDATE, onUpdaterStep);
      $$.Event.off(AppEventNames.HOT_UPDATE_PROGRESS, onUpdaterDownloadProgress);
    };
  }, []);
  return null;
};
