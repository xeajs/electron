import { LocationState, Path } from 'history';
import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';

import RouterWrapNotFound from '@/Render/components/NotFound';
import RouterWrapSpin from '@/Render/components/Spin';

interface RouteChangePropsTypes {
  from: string;
  to: string;
}
interface RouteChangeProps {
  onChange?: (from: string, to: string, next: (path: Path, state?: LocationState) => void) => void;
}

const RouteBeforEachLocation: RouteChangePropsTypes = { from: '/', to: '/' };
let RouteBeforEachLocationCache: string = JSON.stringify(RouteBeforEachLocation);

/**
 * @param props beforEach
 * @Message 不阻塞渲染 异步
 */
export const BaseRouteChange: React.FC<RouteChangeProps> = (props) => {
  const { children } = props;
  const history = useHistory();
  const location = history.location;

  const getRouteBeforEachLocationCacheString = () => {
    return JSON.stringify(RouteBeforEachLocation);
  };

  /** 收集路由变更信息 */
  useEffect(() => {
    RouteBeforEachLocation.to = location.pathname;
    return () => {
      RouteBeforEachLocation.from = location.pathname;
    };
  }, [location.pathname]);

  /**
   * @路由变更处理
   */
  useEffect(() => {
    /**  */
    if (!props.onChange) return;
    if (Reflect.toString.call(props.onChange) !== '[object Function]' && Reflect.toString.call(props.onChange) !== '[object AsyncFunction]') {
      throw new Error('BaseRouteChange 参数不合法' + Reflect.toString.call(props.onChange));
    }
    /** 防重 */
    if (RouteBeforEachLocationCache === getRouteBeforEachLocationCacheString()) return;
    RouteBeforEachLocationCache = getRouteBeforEachLocationCacheString();
    props.onChange(RouteBeforEachLocation.from, RouteBeforEachLocation.to, history.push);
  }, [getRouteBeforEachLocationCacheString()]);

  return <React.Fragment>{children}</React.Fragment>;
};

/**
 * @private
 *
 * @全局路由包装组件
 */
type PackingWithAuthOnChange = (from: string, to: string, next: (path: Path, state?: LocationState) => void) => void;
export const PackingWithAuth: React.FC<{ onChange?: PackingWithAuthOnChange }> = ({ children, onChange }) => {
  const _onChange = (from: string, to: string, next: (path: Path, state?: LocationState) => void) => {
    /** if ('登录状态失效') { message.success('登录状态失效，请重新登录'); next('/login') } */
  };
  return (
    <BaseRouteChange onChange={onChange || _onChange}>
      <Suspense fallback={<RouterWrapSpin />}>
        <Switch>
          {children}
          <Route path="*" component={RouterWrapNotFound}></Route>
        </Switch>
      </Suspense>
    </BaseRouteChange>
  );
};
