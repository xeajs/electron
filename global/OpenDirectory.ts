import { IpcMainEvent, dialog, ipcMain } from 'electron';
/**
 * 打开文件夹选择
 */
type Properties = Array<
  | 'openFile'
  | 'openDirectory'
  | 'multiSelections'
  | 'showHiddenFiles'
  | 'createDirectory'
  | 'promptToCreate'
  | 'noResolveAliases'
  | 'treatPackageAsDirectory'
  | 'dontAddToRecent'
>;
/** 语音第一视角为业务 */
ipcMain.on('emitOpenDirectory', (event: IpcMainEvent, args: { properties: Properties; callbackName?: string }) => {
  dialog.showOpenDialog({ properties: args.properties }).then((val) => {
    event.sender.send('onOpenDirectory', { filePath: val.filePaths, callbackName: args.callbackName });
  });
});
