import * as React from 'react';

import { History } from 'history';
import SVGHome from '@/components/SVG/home';
import SVGList from '@/components/SVG/list';
import { Tooltip } from 'antd';

require('./index.css');

const MenuItemInner = (props: { SVGIcon: React.ReactElement; name: string }) => (
  <div className="flex-col just-center align-center">
    {props.SVGIcon}
    <span className="f14 ui-pt-5">{props.name}</span>
  </div>
);

export default (props) => {
  const history: History = props.history;
  const hash = window.location.hash;
  const activeKey = window.location.hash.split('/')[2];
  const isRecordList = /main\/recordList/.test(hash);
  const isHome = /main\/home/.test(hash);
  if (isRecordList || isHome) {
    const homeClassName = activeKey === 'home' ? 'menu-active' : '';
    const recordListClassName = activeKey === 'recordList' ? 'menu-active' : '';
    return (
      <ul className="menu-box ui-border-right">
        <li className={`menu-item ui-pt-0 ui-hover cursor ${homeClassName}`} onClick={() => history.push(`/main/home`)}>
          <Tooltip overlayClassName="TooltipStyle" placement="rightBottom" title="">
            <span></span>
            <MenuItemInner SVGIcon={<SVGHome color={(homeClassName && '#1790ff') || '#ccc'} />} name="" />
          </Tooltip>
        </li>
        <li
          className={`menu-item ui-pt-20 ui-hover cursor ${recordListClassName}`}
          onClick={() => history.push(`/main/recordList`)}
        >
          <Tooltip overlayClassName="TooltipStyle" placement="rightBottom" title="">
            <span></span>
            <MenuItemInner SVGIcon={<SVGList color={(recordListClassName && '#1790ff') || '#ccc'} />} name="" />
          </Tooltip>
        </li>
      </ul>
    );
  }
  return null;
};
