/**
 * @路由配置规则
 * 一级目录配置为无业务相关的。比如没有没有主窗口或者主窗口不一的
 * 二级目录为业务相关联，比如主要窗口内切换页面
 */
import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import NotFound from '@views/components/NotFound';
import Pages from '@views/pages/index';
import Spin from '@views/components/Spin';

/** 全局一级路由 */
export const SwitchViewRoot = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/" exact component={Pages}></Route>
      <Route path="/main" component={lazy(() => import('@views/pages/Main'))}></Route>
      <Route path="/login" component={lazy(() => import('@views/pages/Login'))}></Route>
      <Route path="/settings" component={lazy(() => import('@views/pages/Settings'))}></Route>
      <Route path="/navigator" component={lazy(() => import('@views/pages/Navigator'))}></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  </Suspense>
);

/** Main 二级级路由 */
export const SwitchViewMain = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/main/" exact component={() => <Redirect to="/main/home" />}></Route>
      <Route path="/main/home" component={lazy(() => import('@views/pages/Main/Home'))}></Route>
      <Route path="/main/userMediaDevices" component={lazy(() => import('@views/pages/Main/UserMediaDevices'))}></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  </Suspense>
);
