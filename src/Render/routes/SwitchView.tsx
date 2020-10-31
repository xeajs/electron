/**
 * @路由配置规则
 * 一级目录配置为无业务相关的。比如没有没有主窗口或者主窗口不一的
 * 二级目录为业务相关联，比如主要窗口内切换页面
 */
import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import NotFound from '@/Render/components/NotFound';
import Pages from '@/Render/pages/index';
import Spin from '@/Render/components/Spin';

/** 全局一级路由 */
export const SwitchViewRoot = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/" exact component={Pages}></Route>
      <Route path="/todo" component={lazy(() => import('@/Render/pages/TodoList'))}></Route>
      <Route path="/settings" component={lazy(() => import('@/Render/pages/Settings'))}></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  </Suspense>
);

/** Todo 二级级路由 */
export const SwitchViewTodo = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/todo/" exact component={() => <Redirect to="/todo/list" />}></Route>
      <Route path="/todo/list" component={lazy(() => import('@/Render/pages/TodoList/List'))}></Route>
      <Route path="/todo/info" component={lazy(() => import('@/Render/pages/TodoList/Info'))}></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  </Suspense>
);
