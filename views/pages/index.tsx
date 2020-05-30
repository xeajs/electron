import { Button } from 'antd';
import React from 'react';
import Warp from '@views/components/Warp';

interface BaseProps {}
interface BaseState {}

export default class extends Warp<BaseProps, BaseState> {
  render() {
    return (
      <section className="ui-vw-100 ui-vh-100 flex align-center just-center">
        <Button style={{ marginRight: '10px' }} onClick={() => this.props.history.push('/home')}>
          Home
        </Button>
        <Button onClick={() => this.props.history.push('/about')}>About</Button>
      </section>
    );
  }
}
