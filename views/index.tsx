import React from 'react';
import ReactDOM from 'react-dom';

// import Routes from '@views/routes/index';

// require('@/assets/css/style.css');
const Root = () => {
  const List = new Array(20).fill(Math.random() + '' + Date.now());
  return (
    <section>
      {List.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </section>
  );
};
ReactDOM.render(<Root />, window.document.getElementById('root'));
