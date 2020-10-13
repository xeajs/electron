import React from 'react';
import { remote } from 'electron';
import { useHistory } from 'react-router';

const DevToolsShowRouterPath: React.FC<{}> = (props) => {
  const history = useHistory();
  const [showPathname, setShowPathname] = React.useState(false);

  /**
   * @事件Listener
   */
  const keydownListener = (e: WindowEventMap['keydown']) => {
    if (e && e.altKey && e.type === 'keydown') return setShowPathname(true);
    setShowPathname(false);
  };
  const keyupListener = () => {
    setShowPathname(false);
  };
  const blurListener = (e: WindowEventMap['keyup'] | WindowEventMap['keydown']) => {
    setShowPathname(false);
  };

  /**
   * @键盘事件
   * @窗口焦点事件
   */
  React.useEffect(() => {
    window.addEventListener('keydown', keydownListener, { once: false });
    window.addEventListener('keyup', keyupListener, { once: false });
    remote.getCurrentWindow().on('blur', blurListener);
    return () => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
      remote.getCurrentWindow().off('blur', blurListener);
      setShowPathname(false);
    };
  }, []);

  return showPathname ? (
    <section className="showPathname">
      <span className="showPathnameText">{history.location.pathname}</span>
      <style jsx>{`
        .showPathname {
          height: 30px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 1024;
        }
        .showPathnameText {
          font-size: 16px;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 0 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #fff;
        }
      `}</style>
    </section>
  ) : null;
};

export default DevToolsShowRouterPath;
