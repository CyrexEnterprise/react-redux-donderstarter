import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { matchPath } from 'react-router'
import Navigation from 'components/Navigation'

import routes, { routesConfig } from './routes'

const routesWithNav = routesConfig
  .filter(route => route.navigation)
  .map(route => ({ path: route.path, exact: true }))

class App extends Component {
  componentWillMount () {
    const { auth } = this.props
    if (auth.authToken != null) {
      this.props.userAuthLogin(auth.authToken)
    }
  }

  includeNavigation = () => {
    const pathname = this.props.location.pathname

    let i = routesWithNav.length
    while (i--) {
      if (matchPath(pathname, routesWithNav[i])) return true
    }

    return false
  }

  navigate = path => event => {
    this.props.history.push(path)
  }

  renderNav () {
    const { auth, logUserOut } = this.props
    const loggedin = auth.user.scope && auth.user.scope.length > 0

    return (
      <Navigation key='navigation' title='DonderStarter'>
        {!loggedin && <button onClick={this.navigate('/login')}>LOGIN</button>}
        {loggedin && <button onClick={logUserOut}>LOGOUT</button>}
      </Navigation>
    )
  }

  render () {
    return [
      this.includeNavigation() && this.renderNav(),
      routes(),
    ]
  }
}

App.propTypes = {
  auth: object.isRequired,
  userAuthLogin: func.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  logUserOut: func.isRequired,
}

export default App
