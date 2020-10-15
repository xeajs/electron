export enum AppEventNames {
  /** 测试 */
  TEST = 'TEST',
  /** Hello */
  HELLO = 'HELLO',
  /** 更新下载进度事件 */
  AUTOUPDATER_DownloadProgress = 'download-progress',
  /** 下载完成，立即更新 */
  AUTOUPDATER_UpdateDownloaded = 'update-downloaded',
  /** 当前已是最新版本 */
  AUTOUPDATER_UpdateNotAvailable = 'update-not-available',
  /** 检测到新版本 */
  AUTOUPDATER_UpdateAvailable = 'update-available',
  /** 取消更新 */
  AUTOUPDATER_UpdateCancelled = 'update-cancelled',
  /** 检测更新回调通知 */
  AUTOUPDATER_CheckingForUpdate = 'checking-for-update',
  /** 更新异常 */
  AUTOUPDATER_Error = 'auto-updater-error',
  /** 安装更新 */
  AUTOUPDATER_ExtendQuitAndInstall = 'extend-quit-and-install',
  /** 检测新版 */
  AUTOUPDATER_ExtendCheckingForUpdate = 'extend-checking-for-update',
  /** 取消更新 */
  AUTOUPDATER_ExtendUpdateCancelled = 'extend-update-cancelled',
  /** 重置下载实例 */
  AUTOUPDATER_ExtendResetUpdaterInstance = 'extend-update-reset-instance'
}
