import React from 'react'
import HomePage from 'containers/HomePage'
import ContactPage from 'containers/ContactPage'
import { Route, Switch } from 'react-router-dom'


const Routes = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route exact path="/contact">
      <ContactPage />
    </Route>
  </Switch>
)

export default Routes
