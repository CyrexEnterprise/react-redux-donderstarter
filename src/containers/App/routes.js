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
 *
 * - to protect a route wrap it in `requireAuth` - requireAuth(Component, arrayOfScopes)
 *
 * - should the route have top navigation? - `navigation: true`
 */
export const routesConfig = [
  { path: '/', exact: true, component: HomePage, navigation: true },
  { path: '/login', component: Login },
  { path: '/protected', component: requireAuth(Protected, ['user']), navigation: true },
  { path: '/intlexamples', component: IntlExamples, navigation: true },
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
