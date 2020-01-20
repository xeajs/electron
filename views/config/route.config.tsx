import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router';

import Loadable from 'react-loadable';

const lazy = (loader) =>
  Loadable({
    loader,
    loading: () => null
  });

export const RouteViewsRoot = () => (
  <Switch>
    <Route path="/" exact component={lazy(() => import('@/pages'))}></Route>
    <Route path="/main" component={lazy(() => import('@/layouts/Main'))}></Route>
  </Switch>
);
export const RouteViewsMain = () => (
  <Switch>
    <Route path="/main/" exact component={() => <Redirect to="/main/home" />}></Route>
    <Route path="/main/home" component={lazy(() => import('@/pages/Home'))}></Route>
    <Route path="/main/recordList" component={lazy(() => import('@/pages/RecordList'))}></Route>
    <Route path="/main/settings" component={lazy(() => import('@/pages/Settings'))}></Route>
  </Switch>
);

export default {
  RouteViewsRoot,
  RouteViewsMain
};
