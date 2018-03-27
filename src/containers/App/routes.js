import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import Login from 'containers/Login'
import HomePage from 'containers/HomePage'
import IntlExamples from 'containers/IntlExamples'
import Protected from 'components/Protected'
import NotFound from 'components/NotFound'

/**
 * Add routes here
 * - should the route be protected by auth? - `protected: true`
 */
export const routesConfig = [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', component: Login },
  { path: '/protected', component: Protected, protected: true },
  { path: '/intlexamples', component: IntlExamples },
  { component: NotFound }
]

export default () => [
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        component={route.protected ? requireAuth(route.component) : route.component}
      />
    )}
  </Switch>
]
