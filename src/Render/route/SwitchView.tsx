/**
 * @Author yejiang1015
 * @Date 2020-12-21 17:41:41
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2020-12-21 17:43:19
 * @Message 路由配置规则
 * @Message 一级目录配置为无业务相关的。比如没有没有主窗口或者主窗口不一的
 * @Message 二级目录为业务相关联，比如主要窗口内切换页面
 */

import React, { lazy } from 'react';
import { Redirect, Route } from 'react-router';

import { PackingWithAuth } from './BaseRoute';
import RouterWrapPages from '@/Render/pages/index';

/** =============================================   @public */
/** ============================================= @全局一级路由 */
export const SwitchViewRoot = () => (
  <PackingWithAuth>
    <Route path="/" exact component={RouterWrapPages}></Route>
    <Route path="/home" component={lazy(() => import('@/Render/pages/Home'))}></Route>
    <Route path="/settings" component={lazy(() => import('@/Render/pages/Settings'))}></Route>
  </PackingWithAuth>
);

/** ============================================= @Home */
/** ============================================= @Home二级路由 */
/** ============================================= @未启用 */
export const SwitchViewHome = () => (
  <PackingWithAuth>
    <Route path="/home/" exact component={() => <Redirect to="/home/list" />}></Route>
    <Route path="/home/list" component={lazy(() => import('@/Render/pages/Home/index'))}></Route>
    <Route path="/home/info" component={lazy(() => import('@/Render/pages/Home/index'))}></Route>
  </PackingWithAuth>
);
