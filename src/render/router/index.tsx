import { createElement, lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Spin from 'src/render/components/spin'

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function load<T extends {}>(factory: any, stateProps?: T) {
  return <Suspense fallback={<Spin />}>{createElement<T>(lazy(factory), stateProps)}</Suspense>
}

export const router: RouteObject[] = [
  {
    path: '/',
    element: load(() => import('src/render/layout/main')),
    children: [
      {
        index: true,
        element: load(() => import('src/render/pages/home')),
      },
      {
        path: '/login',
        element: load(() => import('src/render/pages/login')),
      },
      {
        path: '*',
        element: <>404</>,
      },
    ],
  },
]
