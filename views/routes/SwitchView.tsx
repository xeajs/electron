import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Pages from '@views/pages/index';
import Spin from '@views/components/Spin';

export const SwitchViewRoot = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/" exact component={Pages}></Route>
      <Route path="/home" component={lazy(() => import('@views/pages/Home'))}></Route>
      <Route path="/about" component={lazy(() => import('@views/pages/About'))}></Route>
      <Route path="*" component={lazy(() => import('@views/components/NotFound'))}></Route>
    </Switch>
  </Suspense>
);
export const SwitchViewHome = () => (
  <Suspense fallback={<Spin />}>
    <Switch>
      <Route path="/home/" exact component={() => <Redirect to="/home" />}></Route>
      <Route path="/home/left" component={lazy(() => import('@views/pages/Home/Route/Left'))}></Route>
      <Route path="/home/right" component={lazy(() => import('@views/pages/Home/Route/Right'))}></Route>
    </Switch>
  </Suspense>
);
