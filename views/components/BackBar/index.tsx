import * as React from 'react';

import { History } from 'history';
import SVGBack from '@/components/SVG/back';

interface BaseProps {
  children?: React.ReactElement;
  history: History;
}
const BackBar: React.FC<BaseProps> = (props) => {
  return (
    <div className="ui-pl-30 ui-pr-30">
      <div className="cursor flex align-center ui-pt-10 ui-pb-10 f16 ui-border-bottom">
        <span className="ui-hover flex align-center" onClick={() => props.history.goBack()}>
          <SVGBack />
          <span className="ui-pl-5">返回</span>
        </span>
        <div className="ui-pl-30 flex-1">{props.children || null}</div>
      </div>
    </div>
  );
};

export default BackBar;
