/**
 * AutoUpdater $$.Event.emit(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate, null);
 */
import { Modal, Progress, Spin, message } from 'antd';
import React, { useEffect } from 'react';
import { app, remote } from 'electron';

import { AUTO_updater } from '@/Types/AutoUpdater';
import { AppEventNames } from '@/Types/EventTypes';
import { ModalFuncProps } from 'antd/lib/modal';

const autoUpdater = (): AUTO_updater => {
  return remote.getGlobal('AUTO_updater');
};

const AppSpin: React.FC<{ spin?: boolean }> = (props) => {
  return (
    <div className="ui-w-100">
      {props.spin && <Spin style={{ marginRight: '10px' }} />}
      {props.children}
    </div>
  );
};

/** 每次渲染进程重新加载，触发主进程清理实例 */
autoUpdater().cancel();

let Updater: {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};
const destroy = () => Updater && Updater?.destroy();

const AutoUpdaterWrap: React.FC = (props) => {
  /**
   * @React.FC
   */
  const AUTOUPDATERHandle = () => {
    Updater = Modal.confirm({
      title: '检查更新',
      okButtonProps: { hidden: true },
      cancelButtonProps: { hidden: true },
      centered: true,
      content: <AppSpin spin={true}>正在检测版本信息，请稍后！</AppSpin>
    });
    if (autoUpdater().isDownloadIng) return;
    autoUpdater().checkForUpdates();
  };

  useEffect(() => {
    /**
     * @Effect
     */
    autoUpdater().onDownloadProgress((progress) => {
      Updater?.update({
        okButtonProps: { hidden: false },
        cancelButtonProps: { hidden: false },
        okText: '后台下载',
        cancelText: '取消下载',
        onOk: destroy,
        onCancel: autoUpdater().cancel,
        content: (
          <AppSpin spin={false}>
            <Progress percent={Math.floor(progress.percent * 100) / 100} size="small" status="active" />
          </AppSpin>
        )
      });
    });
    autoUpdater().onUpdater((eventNames: string, args: unknown) => {
      switch (eventNames) {
        case 'error':
          Updater?.update({
            okButtonProps: { hidden: false },
            cancelButtonProps: { hidden: true },
            okText: '知道啦',
            content: (
              <AppSpin>
                <span style={{ color: 'red' }}>检查更新失败啦，请联系管理员！</span>
              </AppSpin>
            )
          });
          $$.log.error('软件更新失败', args);
          break;
        case 'checking-for-update':
          Updater?.update({
            okButtonProps: { hidden: true },
            cancelButtonProps: { hidden: true },
            content: <AppSpin spin={true}>正在检测版本信息，请稍后！</AppSpin>
          });
          break;
        case 'update-cancelled':
          message.info('已取消下载');
          break;
        case 'update-available':
          Updater?.update({
            okButtonProps: { hidden: true },
            cancelButtonProps: { hidden: true },
            content: <AppSpin spin={false}>检测到新版本，准备下载...</AppSpin>
          });
          break;
        case 'update-not-available':
          Updater?.update({
            okButtonProps: { hidden: false },
            cancelButtonProps: { hidden: true },
            okText: '知道啦',
            onOk: destroy,
            content: <AppSpin spin={false}>当前已是最新版本！</AppSpin>
          });
          break;
        case 'update-downloaded':
          Updater?.update({
            okButtonProps: { hidden: false },
            cancelButtonProps: { hidden: false },
            okText: '立即安装',
            cancelText: '跳过',
            onOk: autoUpdater().quitAndInstall,
            onCancel: destroy,
            content: <AppSpin spin={false}>软件下载成功，立即安装？</AppSpin>
          });
          break;
        default:
          break;
      }
    });

    $$.Event.on(AppEventNames.AUTOUPDATER, AUTOUPDATERHandle);
    return () => {
      $$.Event.off(AppEventNames.AUTOUPDATER, AUTOUPDATERHandle);
    };
  }, []);
  return null;
};

export default AutoUpdaterWrap;
