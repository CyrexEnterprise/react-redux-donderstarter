import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import Login from 'containers/Login'
import HomePage from 'containers/HomePage'
import Protected from 'components/Protected'
import NotFound from 'components/NotFound'
import TodoList from 'containers/TodoList'

/**
 * Add routes here
 * - should the route be protected by auth? - `scopes: [string]`
 *    Array of the required scopes for the route.
 *
 * - should the route have bottom navigation? - `navigation: true`
 */
export const routesConfig = [
  { path: '/', exact: true, component: HomePage, navigation: true },
  { path: '/login', component: Login },
  { path: '/protected', component: Protected, scopes: ['user'], navigation: true },
  { path: '/todo', component: TodoList },
  { component: NotFound }
]

export default () => [
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        component={Array.isArray(route.scopes) ? requireAuth(route.component, route.scopes) : route.component}
      />
    )}
  </Switch>
]
