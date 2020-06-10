import React from 'react';

export default () => {
  return (
    <div>
      {[...Array(2).keys()].map((i) => (
        <p key={i}>用户设置 {i}</p>
      ))}
    </div>
  );
};
