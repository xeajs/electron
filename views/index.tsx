import { Button } from 'antd';
import Header from '@views/components/Header';
import React from 'react';
import ReactDOM from 'react-dom';
import style from '@views/index.less';

require('@views/assets/css/style.less');
const Root = () => {
  const List = new Array(20).fill(Math.random() + '' + Date.now());
  return (
    <section>
      <Header />
      <br />
      <div className={style.hello}>css scope</div>
      <Button type="primary">Hello Word</Button>
      {List.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </section>
  );
};
ReactDOM.render(<Root />, window.document.getElementById('root'));
