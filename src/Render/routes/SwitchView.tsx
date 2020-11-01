/**
 * @路由配置规则
 * 一级目录配置为无业务相关的。比如没有没有主窗口或者主窗口不一的
 * 二级目录为业务相关联，比如主要窗口内切换页面
 */
import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import RouterWrapNotFound from '@/Render/components/NotFound';
import RouterWrapPages from '@/Render/pages/index';
import RouterWrapSpin from '@/Render/components/Spin';

/**
 * @private
 *
 * @全局路由包装组件
 */
const Packing: React.FC = ({ children }) => (
  <Suspense fallback={<RouterWrapSpin />}>
    <Switch>
      {children}
      <Route path="*" component={RouterWrapNotFound}></Route>
    </Switch>
  </Suspense>
);

/**
 * @public
 *
 * @全局一级路由
 */
export const SwitchViewRoot = () => (
  <Packing>
    <Route path="/" exact component={RouterWrapPages}></Route>
    <Route path="/todo" component={lazy(() => import('@/Render/pages/TodoList'))}></Route>
    <Route path="/settings" component={lazy(() => import('@/Render/pages/Settings'))}></Route>
  </Packing>
);

/**
 * @public
 *
 * @Todo二级级路由
 */
export const SwitchViewTodo = () => (
  <Packing>
    <Route path="/todo/" exact component={() => <Redirect to="/todo/list" />}></Route>
    <Route path="/todo/list" component={lazy(() => import('@/Render/pages/TodoList/List'))}></Route>
    <Route path="/todo/info" component={lazy(() => import('@/Render/pages/TodoList/Info'))}></Route>
  </Packing>
);
