import React, { Component } from 'react';

import { Button } from 'antd';

export default class extends Component<{ name: string }, {}> {
  constructor(props) {
    super(props);
    this.state = {};
    console.info(`[LifeCycle]: constructor`);
  }
  UNSAFE_componentWillMount() {
    console.info(`[LifeCycle]: UNSAFE_componentWillMount`);
  }
  componentDidCatch() {
    console.info(`[LifeCycle]: componentDidCatch`);
  }
  componentDidUpdate() {
    console.info(`[LifeCycle]: componentDidUpdate`);
  }
  componentWillUnmount() {
    console.info(`[LifeCycle]: componentWillUnmount`);
  }
  UNSAFE_componentWillReceiveProps() {
    console.info(`[LifeCycle]: UNSAFE_componentWillReceiveProps`);
  }
  UNSAFE_componentWillUpdate() {
    console.info(`[LifeCycle]: UNSAFE_componentWillUpdate`);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.info(`[LifeCycle]: shouldComponentUpdate`);
    if ('a' === window['a']) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    console.info(`[LifeCycle]: componentDidMount`);
  }
  render() {
    console.info(`[LifeCycle]: render`);
    return (
      <div>
        <Button>生命周期</Button>
      </div>
    );
  }
}
