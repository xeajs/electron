/**
 * @Author yejiang1015
 * @Date 2020-06-19 22:38:32
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-06-20 00:03:54
 * @Message Mac 系统
 */

import Close from './Close';
import Mini from './Mini';
import React from 'react';
import Toggle from './Toggle';
import { remote } from 'electron';

const Wrap: React.FC = () => {
  const [focus, setFocus] = React.useState(remote.getCurrentWindow().isFocused());
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    remote.getCurrentWindow().on('focus', () => {
      setFocus(true);
    });
    remote.getCurrentWindow().on('blur', () => {
      setFocus(false);
    });
  }, []);
  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };
  return (
    <>
      <div className="ctl-box" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Close focus={focus} hover={hover} />
        <Mini focus={focus} hover={hover} />
        <Toggle focus={focus} hover={hover} />
      </div>
      <style jsx>{`
        .ctl-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 68px;
          padding: 0 4px;
        }
      `}</style>
    </>
  );
};

export default Wrap;
