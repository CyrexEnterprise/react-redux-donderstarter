
import { connect } from 'react-redux'
import RequireAuth from './RequireAuth'
import { USER_ROLES } from 'constants/global'

/**
 * Conected RequireAuth
 * It passes store auth, Component and roleRequired as props to RequireAuth.
 *
 * @param {Function} Component - The component to be shown if authorized
 * @param {string} roleRequired - The minimum role a user must have to see the component
 */
export default (Component, roleRequired = USER_ROLES[0]) => {
  const mapStateToProps = ({ auth }) => ({
    ...auth,
    Component,
    roleRequired
  })

  return connect(mapStateToProps)(RequireAuth)
}
