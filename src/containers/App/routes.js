import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import Login from 'containers/Login'
import HomePage from 'containers/HomePage'
import Protected from 'components/Protected'
import NotFound from 'components/NotFound'

/**
 * Add routes here
 *
 * - should the route have bottom navigation? - `navigation: true`
 */
export const routesConfig = [
  { path: '/', exact: true, component: HomePage, navigation: true },
  { path: '/login', component: Login },
  { path: '/protected', component: requireAuth(Protected, ['user']), navigation: true },
  { component: NotFound },
]

export default () => [
  <Switch key='routes'>
    {routesConfig.map((options, indx) =>
      <Route
        key={`routes-${indx}`}
        {...options}
      />
    )}
  </Switch>,
]
