
import { connect } from 'react-redux'
import RequireAuth from './RequireAuth'

import { Store } from 'store/types'

/**
 * Conected RequireAuth
 * It maps user scopes, Component, scopes required and authorizing flag to RequireAuth
 */
export default (Component: React.ElementType, scopesRequired: string[]) => {
  const mapStateToProps = ({ auth }: Store) => ({
    Component,
    isAuthorizing: auth.isAuthorizing,
    scopes: auth.user ? auth.user.scope : [],
    scopesRequired,
  })

  return connect(mapStateToProps)(RequireAuth)
}
