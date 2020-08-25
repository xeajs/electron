/**
 * @Author yejiang1015
 * @Date 2020-06-19 22:38:32
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-08-25 11:43:50
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
    /** 失去焦点hover */
    if (!remote.getCurrentWindow().isFocused()) {
      setFocus(true);
      setHover(true);
    } else {
      setHover(true);
    }
  };
  const onMouseLeave = () => {
    if (!remote.getCurrentWindow().isFocused()) {
      setFocus(false);
      setHover(false);
    } else {
      setHover(false);
    }
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
          padding: 0 7.5px;
        }
      `}</style>
    </>
  );
};

export default Wrap;
