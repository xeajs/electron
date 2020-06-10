import React from 'react';

export default () => {
  return (
    <div>
      {[...Array(30).keys()].map((i) => (
        <p key={i}>通用设置 {i}</p>
      ))}
    </div>
  );
};
