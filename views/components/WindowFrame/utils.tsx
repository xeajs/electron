/**
 * @Author yejiang1015
 * @Date 2020-06-08 14:29:31
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-06-08 16:04:01
 * @memo return true 不更新， false 更新
 */
import { remote } from 'electron';

export interface BaseWrapTypes {
  width?: number;
  height?: number;
  color?: string;
  onFunc: () => void;
}

export function memoPropsAreEqual(prevProps: Readonly<BaseWrapTypes>, nextProps: Readonly<BaseWrapTypes>): boolean {
  for (const key in prevProps) {
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
}

export function onFuncMini() {
  remote.getCurrentWindow().minimize();
}
export function onFuncMaximize() {
  remote.getCurrentWindow().maximize();
}
export function onFuncRestore() {
  remote.getCurrentWindow().restore();
}
export function onFuncClose() {
  remote.getCurrentWindow().close();
}
