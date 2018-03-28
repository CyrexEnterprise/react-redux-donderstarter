/**
 * HOC that authorizes users based on their role
 * and the component required role
 * @module Auth
 */

import React, { Component } from 'react'
import { object, bool, func, string, arrayOf } from 'prop-types'

export class RequireAuth extends Component {
  state = {
    isAuthorized: false
  }

  componentWillMount () {
    const { user, isAuthorizing } = this.props
    const scopes = Array.isArray(user.scope) ? user.scope : []
    this.checkAuth(scopes, isAuthorizing)
  }

  componentWillReceiveProps (nextprops) {
    const { user, isAuthorizing } = nextprops
    const scopes = Array.isArray(user.scope) ? user.scope : []
    this.checkAuth(scopes, isAuthorizing)
  }

  /**
   * Matches the user authorization level with the component required level
   * and show the component authorized or redirects to login otherwise.
   * It also waits if the `isAuthorizing` flag is true.
   *
   * @param {[]string} scopes - The current user scopes to be match with the Component required scopes
   * @param {boolean} isAuthorizing - Flag used to perform no action until athorization is resolved
   */
  checkAuth (scopes, isAuthorizing) {
    const { history, location, scopesRequired } = this.props

    if (scopesRequired.every(s => scopes.includes(s))) {
      return this.setState({ isAuthorized: true })
    } else if (!isAuthorizing) {
      history.replace('/login', { onSuccess: location.pathname })
    }
  }

  render () {
    const { Component, scopesRequired, isAuthorizing, ...rest } = this.props
    return (this.state.isAuthorized && <Component {...rest} />)
  }
}

RequireAuth.propTypes = {
  /**
   * Browser history stack
   */
  history: object.isRequired,
  /**
   * The navigation state
   */
  location: object.isRequired,
  /**
   * The user object
   */
  user: object.isRequired,
  /**
   * Flag that tells an authorization is been asked
   */
  isAuthorizing: bool.isRequired,
  /**
   * The Component to be wrapped
   */
  Component: func.isRequired,
  /**
   * The scopes required to show the wrapped Component
   */
  scopesRequired: arrayOf(string).isRequired
}

export default RequireAuth
