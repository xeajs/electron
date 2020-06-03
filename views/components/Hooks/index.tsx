import { MobXProviderContext } from 'mobx-react';
import React from 'react';

export function useInject<T>(...args): T {
  const store = React.useContext(MobXProviderContext);
  const resultStore = {};
  args.forEach((k) => {
    if (!store[k]) {
      throw new Error(`${k} is not defined`);
    }
    resultStore[k] = store[k];
  });
  return resultStore as T;
}
