import * as React from 'react'
import { matchPath } from 'react-router'
import { __DEV__ } from 'constants/env'
import Navigation from 'components/Navigation'

import routes, { routesConfig } from './routes'

import './styles.scss'

import { AppProps } from './types'

if (__DEV__) {
  import('util/reactotronConfig').then(() => console.log('Reactotron Configured'))
}

const routesWithNav = routesConfig
  .filter(route => route.navigation)
  .map(route => ({ path: route.path, exact: true }))

class App extends React.Component<AppProps> {
  public constructor (props: AppProps) {
    super(props)

    const { auth, userAuthLogin } = props
    if (auth.authToken != null) {
      userAuthLogin()
    }
  }

  public render () {
    return [
      this.includeNavigation() && this.renderNav(),
      routes(),
    ]
  }

  private includeNavigation = () => {
    const pathname = this.props.location.pathname

    let i = routesWithNav.length
    while (i--) {
      if (matchPath(pathname, routesWithNav[i])) return true
    }

    return false
  }

  private navigate = (path: string) => () => {
    this.props.history.push(path)
  }

  private renderNav () {
    const { auth, logUserOut } = this.props
    const loggedin = auth.user

    return (
      <Navigation key='navigation' title='DonderStarter'>
        {!loggedin && <button onClick={this.navigate('/login')}>LOGIN</button>}
        {loggedin && <button onClick={logUserOut}>LOGOUT</button>}
      </Navigation>
    )
  }
}

export default App
