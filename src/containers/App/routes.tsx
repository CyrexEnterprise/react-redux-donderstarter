import * as React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import Login from 'containers/Login'
import HomePage from 'containers/HomePage'
import Protected from 'components/Protected'
import NotFound from 'components/NotFound'

import { AppRouteProps } from './types'

/**
 * Add routes here
 *
 * - to protect a route wrap it in `requireAuth` - requireAuth(Component, arrayOfScopes) in thee component property.
 */
export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: HomePage, navigation: true },
  { path: '/login', component: Login },
  { path: '/protected', component: requireAuth(Protected, ['user']), navigation: true },
  { component: NotFound },
]

export default () => (
  <Switch key='routes'>
    {routesConfig.map((options, indx) =>
      <Route
        key={`routes-${indx}`}
        {...options}
      />
    )}
  </Switch>
)
