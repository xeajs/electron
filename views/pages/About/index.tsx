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
    console.log('父组件 组件周期 constructor');
    console.log(React.isValidElement(LifeCycle));
  }

  UNSAFE_componentWillMount() {
    console.log('父组件 组件周期 UNSAFE_componentWillMount');
  }
  componentDidMount() {
    console.log('父组件 组件周期 componentDidMount');
  }
  componentDidUpdate() {
    console.log('父组件 组件周期 componentDidUpdate');
  }
  render() {
    return (
      <div>
        <SetState>
          <span>
            <p>asdf</p>
            <p>asdf</p>
          </span>
          <span>asasdf</span>
        </SetState>
        <LifeCycle name="LifeCycle" />
      </div>
    );
  }
}
