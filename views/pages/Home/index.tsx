import * as React from 'react';

import { Badge, Button, Empty, Icon, InputNumber } from 'antd';
import { GlobalStore, RecorderStore } from '@/store/index';
import { inject, observer } from 'mobx-react';

import { ExtendsClassWrap } from '@/components/Extends';
import styles from './index.module.css';

interface BaseProps {
  RecorderStore: RecorderStore;
  GlobalStore: GlobalStore;
}

@inject('RecorderStore', 'GlobalStore')
@observer
export default class App extends ExtendsClassWrap<BaseProps, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  /** Socket */
  SocketInstance(): void {}

  render() {
    const { GlobalStore } = this.props;

    return (
      <div>
        <div className="ui-p-30">
          <ul className={styles.cardList}>
            <li className={`${styles.cardItem} ${styles.cardItemFirst}`}>
              <Icon type="plus" style={{ fontSize: '40px', color: '#999' }} />
              <span className="ui-pt-10">开始新采集</span>
            </li>
            <li className={`${styles.cardItem}`}>
              <Badge count={GlobalStore.settings.noComplete}>
                <Button type="dashed" style={{ height: '56px' }}>
                  未完成的采集
                </Button>
              </Badge>
            </li>
            <li className={`${styles.cardItem}`}>
              <Badge count={GlobalStore.settings.noReport}>
                <Button type="dashed" style={{ height: '56px' }}>
                  未上报的采集
                </Button>
              </Badge>
            </li>
            <li className={`${styles.cardItem}`}>
              <Badge count={GlobalStore.settings.reportFail}>
                <Button type="dashed" style={{ height: '56px' }}>
                  上报失败的采集
                </Button>
              </Badge>
            </li>
            <li className={`${styles.cardItem}`}>
              <InputNumber
                min={1}
                max={100000}
                defaultValue={GlobalStore.settings.reportFail}
                onChange={(val: number) => {
                  SPK.SetSettings({ reportFail: val });
                }}
              />
            </li>
            <li className={`${styles.cardItem}`}>
              <Empty description="敬请期待！" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
