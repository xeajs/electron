import { Button, Empty, Rate, Skeleton, Spin } from 'antd';

import LayoutMain from '@views/layout/Main';
import React from 'react';
import Warp from '@views/components/Warp';

interface BaseProps {}
interface BaseState {}

export default class extends Warp<BaseProps, BaseState> {
  render() {
    return (
      <LayoutMain>
        <section className="ui-v-100 ui-v-100 flex-col align-center just-center">
          <div style={{ backgroundColor: '#fff', marginTop: '40px' }} className="ui-w-100 flex just-center">
            <Rate allowHalf defaultValue={5} />
          </div>
          <div className="flex" style={{ marginTop: '40px' }}>
            <Button style={{ marginRight: '10px' }} onClick={() => this.props.history.push('/home')}>
              Home
            </Button>
            <Button onClick={() => this.props.history.push('/about')}>About</Button>
          </div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          <Spin />
          <div style={{ backgroundColor: '#fff', height: '474px', width: '100%' }}>
            <Skeleton active />
          </div>
        </section>
      </LayoutMain>
    );
  }
}
