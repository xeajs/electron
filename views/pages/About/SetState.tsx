import React, { Component } from 'react';

import { Button } from 'antd';

interface BaseProps {}
interface BaseState {
  update1: number;
  update2: number;
  update3: number;
  update4: number;
  update5: number;
  update6: number;
  username: string;
}
export default class extends Component<BaseProps, BaseState> {
  constructor(props) {
    super(props);
    this.state = {
      update1: 1,
      update2: 2,
      update3: 3,
      update4: 4,
      update5: 5,
      update6: 6,
      username: '2432'
    };
  }
  update1() {
    this.setState({ update1: this.state.update1 + 1 });
    console.log(`2 === ${this.state.update1}`);
  }
  update2() {
    setTimeout(() => {
      this.setState({ update2: this.state.update2 + 1 });
      console.log(`3 === ${this.state.update2}`);
    }, 0);
  }
  componentDidMount() {
    console.log(this.props);
    setTimeout(() => {
      this.setState({ update3: this.state.update3 + 1 });
      console.log(`4 === ${this.state.update3}`);
    });

    this.setState({ update4: this.state.update4 + 1 });
    console.log(`5 === ${this.state.update4}`);

    document.getElementById('update6')?.addEventListener('click', () => {
      this.setState({ update5: this.state.update5 + 1 });
      console.log(`6 === ${this.state.update5}`);
    });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.update1()}>更新1</Button>
        <Button onClick={() => this.update2()}>更新2</Button>
        <button id="update6">原生事件更新</button>
        <input type="text" name="username" value={this.state.username} onChange={() => {}} />
      </div>
    );
  }
}
