
import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth from 'containers/Auth'
import HomePage from 'containers/HomePage'
import Protected from 'components/Protected'
import NotFound from '../NotFound'

export default () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/protected' component={requireAuth(Protected, 'user')} />
    <Route component={NotFound} />
  </Switch>
)
