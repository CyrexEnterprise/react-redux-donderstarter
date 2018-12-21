/**
 * HOC that authorizes users based on their role
 * and the component required role
 * @module Auth
 */

import React, { Component } from 'react'
import { object, bool, func, string, arrayOf, array } from 'prop-types'

export class RequireAuth extends Component {
  constructor (props) {
    super(props)

    const isAuthorized = RequireAuth.isAuthorized(props)

    if (!props.isAuthorizing && !isAuthorized) {
      const { history, location } = props
      const pathname = location.pathname
      const loginPath = '/login'

      if (pathname !== loginPath) {
        history.replace(loginPath, { onSuccess: pathname })
      }
    }

    this.state = {
      isAuthorized,
    }
  }

  static isAuthorized (props) {
    const { scopes, scopesRequired } = props

    return scopesRequired.every(s => scopes.includes(s))
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      isAuthorized: RequireAuth.isAuthorized(nextProps),
    }
  }

  render () {
    const { Component, scopesRequired, scopes, isAuthorizing, ...rest } = this.props
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
   * The user scopes
   */
  scopes: array.isRequired,
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
  scopesRequired: arrayOf(string).isRequired,
}

export default RequireAuth
