import * as React from 'react';

import SVGClose from '@/components/SVG/close';
import SVGMaximize from '@/components/SVG/maximize';
import SVGMini from '@/components/SVG/mini';
import SVGRestore from '@/components/SVG/restore';
import { remote } from 'electron';
import styles from './index.module.css';

interface BaseProps {
  /** 最小化 */
  miniFunc?: Function;
  /** 取消全屏 */
  restoreFunc?: Function;
  /** 全屏 */
  maximizeFunc?: Function;
  /** 关闭 */
  closeFunc?: Function;
  /** 显示按钮 */
  noClose?: boolean;
  noToggleScreen?: boolean;
  noMini?: boolean;
}

export default class extends React.Component<BaseProps, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    remote.getCurrentWindow().on('resize', () => {
      this.forceUpdate();
    });
  }
  render() {
    /** 是否是全屏显示 */
    const win = remote.getCurrentWindow();
    const { noClose, noMini, noToggleScreen } = this.props;
    return (
      <React.Fragment>
        {/* 最小化 */}
        {!!noMini ? null : (
          <span
            className={styles.systemButtons}
            onClick={() => {
              win.minimize();
            }}
          >
            <SVGMini width={16} height={16} color="#c0c4cc" />
          </span>
        )}
        {/* 最大化和还原窗口 */}
        {!!noToggleScreen ? null : (
          <span className={styles.systemButtons} onClick={() => (win.isMaximized() ? win.restore() : win.maximize())}>
            {win.isMaximized() ? (
              <SVGRestore width={24} height={24} color="#c0c4cc" />
            ) : (
              <SVGMaximize width={15} height={15} color="#c0c4cc" />
            )}
          </span>
        )}
        {!!noClose ? null : (
          <span
            className={`${styles.systemButtons} ${styles.systemButtonsClose}`}
            onClick={() => {
              /** 关闭窗口 */
              win.close();
              /** 如果有系统托盘，则关闭窗口为隐藏窗口，要彻底关闭软件则是托盘右键点击退出软件退出 */
              // win.hide();
            }}
          >
            <SVGClose width={18} height={18} color="#c0c4cc" />
          </span>
        )}
      </React.Fragment>
    );
  }
}
