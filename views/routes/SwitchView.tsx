/**
 * @路由配置规则
 * 一级目录配置为无业务相关的。比如没有没有主窗口或者主窗口不一的
 * 二级目录为业务相关联，比如主要窗口内切换页面
 */
import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Pages from '@views/pages/index';
import Spin from '@views/components/Spin';

export const SwitchViewRoot = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/" exact component={Pages}></Route>
      <Route path="/main" component={lazy(() => import('@views/pages/Main'))}></Route>
      <Route path="/about" component={lazy(() => import('@views/pages/About'))}></Route>
      <Route path="*" component={lazy(() => import('@views/components/NotFound'))}></Route>
    </Switch>
  </Suspense>
);
export const SwitchViewMain = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/main/" exact component={() => <Redirect to="/main/hello" />}></Route>
      <Route path="/main/hello" component={lazy(() => import('@views/pages/MainHello'))}></Route>
      <Route path="/main/settings" component={lazy(() => import('@views/pages/MainSettings'))}></Route>
      <Route path="*" component={lazy(() => import('@views/components/NotFound'))}></Route>
    </Switch>
  </Suspense>
);
