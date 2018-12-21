
import { connect } from 'react-redux'
import RequireAuth from './RequireAuth'

/**
 * Conected RequireAuth
 * It passes store auth, Component and roleRequired as props to RequireAuth.
 *
 * @param {Function} Component - The component to be shown if authorized
 * @param {[]string} scopesRequired - The scopes a user must have to see the component
 */
export default (Component, scopesRequired) => {
  const mapStateToProps = ({ auth }) => ({
    scopes: auth.scopes,
    isAuthorizing: auth.isAuthorizing,
    Component,
    scopesRequired,
  })

  return connect(mapStateToProps)(RequireAuth)
}
