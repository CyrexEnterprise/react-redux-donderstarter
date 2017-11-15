/**
 * HOC that authorizes users based on their role
 * and the component required role
 * @module Auth
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { USER_ROLES } from './ducks'

export default (Component, roleRequired = 'user') => {
  class requireAuth extends React.Component {
    state = {
      isAuthorized: false
    }

    componentWillMount () {
      const { user, isAuthorizing } = this.props
      this.checkAuth(USER_ROLES.indexOf(user.role), isAuthorizing)
    }

    componentWillReceiveProps (nextprops) {
      const { user, isAuthorizing } = nextprops
      this.checkAuth(USER_ROLES.indexOf(user.role), isAuthorizing)
    }

    checkAuth (userLevel, isAuthorizing) {
      const { history, location } = this.props
      const requiredLevel = USER_ROLES.indexOf(roleRequired)

      if (userLevel >= requiredLevel) {
        this.setState({ isAuthorized: true })
      } else if (!isAuthorizing) {
        history.replace('/login', { onSuccess: location.pathname })
      }
    }

    render () {
      return (this.state.isAuthorized && <Component {...this.props} />)
    }
  }

  requireAuth.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isAuthorizing: PropTypes.bool.isRequired
  }

  const mapStateToProps = ({ auth }) => (auth)

  return connect(mapStateToProps)(requireAuth)
}
