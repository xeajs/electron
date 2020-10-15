/**
 * AutoUpdater $$.Event.emit(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate, null);
 */
import { Modal, Progress, Spin, message } from 'antd';
import React, { useEffect } from 'react';

import { AppEventNames } from 'typing/EventTypes';
import { ModalFuncProps } from 'antd/lib/modal';
import { ProgressInfo } from 'builder-util-runtime';

const AppSpin: React.FC<{ spin?: boolean }> = (props) => {
  return (
    <div className="ui-w-100">
      {props.spin && <Spin style={{ marginRight: '10px' }} />}
      {props.children}
    </div>
  );
};

/** 每次渲染进程重新加载，触发主进程清理实例 */
$$.Event.emit(AppEventNames.AUTOUPDATER_ExtendResetUpdaterInstance, null);

let Updater: {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};

const _AutoUpdaterInstall = () => {
  $$.Event.emit(AppEventNames.AUTOUPDATER_ExtendQuitAndInstall, null);
};
const _AutoUpdaterCancelInstall = () => {
  $$.Event.emit(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled, null);
};
const destroy = () => Updater && Updater?.destroy();

const AutoUpdaterWrap: React.FC = (props) => {
  const AUTOUPDATER_ExtendCheckingForUpdate = () => {
    Updater = Modal.confirm({
      okButtonProps: { hidden: false },
      cancelButtonProps: { hidden: true },
      okText: '取消',
      onOk: () => {
        _AutoUpdaterCancelInstall();
        destroy();
      },
      title: '检查更新',
      centered: true,
      content: <AppSpin spin={true}>正在检测版本信息，请稍后！</AppSpin>
    });
  };

  useEffect(() => {
    $$.Event.on(AppEventNames.AUTOUPDATER_Error, (error) => {
      $$.log.error('软件更新失败', error);
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
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_CheckingForUpdate, () => {
      Updater?.update({
        okButtonProps: { hidden: true },
        cancelButtonProps: { hidden: true },
        content: <AppSpin spin={true}>正在检测版本信息，请稍后！</AppSpin>
      });
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled, () => {
      message.info('已取消下载');
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_UpdateAvailable, () => {
      Updater?.update({
        okButtonProps: { hidden: true },
        cancelButtonProps: { hidden: true },
        content: <AppSpin spin={false}>检测到新版本，准备下载...</AppSpin>
      });
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_UpdateNotAvailable, () => {
      Updater?.update({
        okButtonProps: { hidden: false },
        cancelButtonProps: { hidden: true },
        okText: '知道啦',
        onOk: destroy,
        content: <AppSpin spin={false}>当前已是最新版本！</AppSpin>
      });
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_UpdateDownloaded, () => {
      Updater?.update({
        okButtonProps: { hidden: false },
        cancelButtonProps: { hidden: false },
        okText: '立即安装',
        cancelText: '跳过',
        onOk: _AutoUpdaterInstall,
        onCancel: destroy,
        content: <AppSpin spin={false}>软件下载成功，立即安装？</AppSpin>
      });
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_DownloadProgress, (progress: ProgressInfo) => {
      Updater?.update({
        okButtonProps: { hidden: false },
        cancelButtonProps: { hidden: false },
        okText: '后台下载',
        cancelText: '取消下载',
        onOk: destroy,
        onCancel: _AutoUpdaterCancelInstall,
        content: (
          <AppSpin spin={false}>
            <Progress percent={Math.floor(progress.percent * 100) / 100} size="small" status="active" />
          </AppSpin>
        )
      });
    });
    $$.Event.on(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate, AUTOUPDATER_ExtendCheckingForUpdate);

    return () => {
      $$.Event.off(AppEventNames.AUTOUPDATER_Error);
      $$.Event.off(AppEventNames.AUTOUPDATER_CheckingForUpdate);
      $$.Event.off(AppEventNames.AUTOUPDATER_ExtendUpdateCancelled);
      $$.Event.off(AppEventNames.AUTOUPDATER_UpdateAvailable);
      $$.Event.off(AppEventNames.AUTOUPDATER_UpdateNotAvailable);
      $$.Event.off(AppEventNames.AUTOUPDATER_UpdateDownloaded);
      $$.Event.off(AppEventNames.AUTOUPDATER_DownloadProgress);
      $$.Event.off(AppEventNames.AUTOUPDATER_ExtendCheckingForUpdate, AUTOUPDATER_ExtendCheckingForUpdate);
    };
  }, []);
  return null;
};

export default AutoUpdaterWrap;
