
import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import Login from 'containers/Auth/Login'
import HomePage from 'containers/HomePage'
import Protected from 'components/Protected'
import NotFound from 'components/NotFound'

export default () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/login' component={Login} />
    <Route path='/protected' component={requireAuth(Protected, 'user')} />
    <Route component={NotFound} />
  </Switch>
)
