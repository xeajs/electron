import React from 'react';

export default () => {
  return (
    <div>
      {[...Array(2).keys()].map((i) => (
        <p key={i}>其他设置 {i}</p>
      ))}
    </div>
  );
};
