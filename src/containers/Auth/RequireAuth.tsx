/**
 * HOC that authorizes users based on their scopes and the component required scopes
 */

import * as React from 'react'

import { RequireAuthProps, RequireAuthState } from './types'

class RequireAuth extends React.Component<RequireAuthProps, RequireAuthState> {
  public constructor (props: RequireAuthProps) {
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

    this.state = { isAuthorized }
  }

  public static getDerivedStateFromProps (nextProps: RequireAuthProps) {
    return {
      isAuthorized: RequireAuth.isAuthorized(nextProps),
    }
  }

  private static isAuthorized (props: RequireAuthProps) {
    const { scopes, scopesRequired } = props

    return scopesRequired.every((s) => scopes.includes(s))
  }

  public render () {
    const { Component, scopesRequired, scopes, isAuthorizing, ...rest } = this.props
    return (this.state.isAuthorized && <Component {...rest} />)
  }
}

export default RequireAuth
