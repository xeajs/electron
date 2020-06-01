import LifeCycle from './LifeCycle';
import React from 'react';
import SetState from './SetState';
import Wrap from '@views/components/Warp';

interface BaseProps {}
interface BaseState {}
export default class extends Wrap<BaseProps, BaseState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SetState />
        <LifeCycle name="LifeCycle" />
      </div>
    );
  }
}
