import { Component } from 'react'
import { object, func } from 'prop-types'

import routes from './routes'

class App extends Component {
  componentWillMount () {
    const { auth } = this.props
    if (auth.authToken != null) {
      this.props.userAuthLogin(auth.authToken)
    }
  }

  render () {
    return routes()
  }
}

App.propTypes = {
  auth: object.isRequired,
  userAuthLogin: func.isRequired
}

export default App
