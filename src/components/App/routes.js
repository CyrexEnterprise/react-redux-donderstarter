
import React from 'react'
import { Route, Switch } from 'react-router'

import HomePage from 'containers/HomePage'
import NotFound from '../NotFound'

export default () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route component={NotFound} />
  </Switch>
)
