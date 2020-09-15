import { MobXProviderContext } from 'mobx-react';
import React from 'react';
import { StoreTypes } from '@views/store/index';

/**
 * @useInject 返回类型
 */
type UseInjectBackType<P extends keyof StoreTypes> = { [K in P]: StoreTypes[K] };

/**
 * @注入所有 useInjectAll
 */
export function useInjectAll(): StoreTypes {
  return React.useContext(MobXProviderContext) as StoreTypes;
}

/**
 * @useInject
 * @Mobx 按需注入
 */
export function useInject<P extends keyof StoreTypes>(...storeNames: P[]): UseInjectBackType<P> {
  const ProviderStore = React.useContext(MobXProviderContext);
  const _Store: Partial<UseInjectBackType<P>> = {};
  for (const storeName of storeNames) {
    if (!ProviderStore[storeName]) {
      throw new Error(`${storeName} is not defined`);
    }
    _Store[storeName] = ProviderStore[storeName];
  }
  return _Store as UseInjectBackType<P>;
}
