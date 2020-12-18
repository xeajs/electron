import { ProgressInfo } from 'builder-util-runtime';
import { UpdateCheckResult } from 'electron-updater';

export type onUpdaterTypes = (eventNames: string, args: unknown) => void;
export type onDownloadProgressTypes = (progress: ProgressInfo) => void;

export type AUTO_updater = {
  cacheDir?: string;
  updateCheckResult: null | UpdateCheckResult;
  isDownloadIng: boolean;
  onUpdater: (callback: onUpdaterTypes) => void;
  onDownloadProgress: (callback: onDownloadProgressTypes) => void;
  quitAndInstall: () => void;
  checkForUpdates: () => void;
  cancel: () => void;
};
