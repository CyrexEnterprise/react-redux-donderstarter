import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { matchPath } from 'react-router'
import Navigation from 'components/Navigation'

import routes, { routesConfig } from './routes'

const routesWithNav = routesConfig
  .filter(route => route.navigation)
  .map(route => ({ path: route.path, exact: true }))

class App extends Component {
  constructor (props) {
    super(props)

    const { auth, userAuthLogin } = props
    if (auth.authToken != null) {
      userAuthLogin()
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
    const loggedin = auth.scopes && auth.scopes.length > 0

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
