import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './ducks'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  _handleEmailChange = ({ target }) => {
    const { value } = target
    this.setState({ email: value })
  }

  _handlePwdChange = ({ target }) => {
    const { value } = target
    this.setState({ password: value })
  }

  _onButtonClick = () => {
    const { email, password } = this.state

    if (email.length && password.length) {
      this.props.logUserIn({ email, password })
    }
  }

  render () {
    const { email, password } = this.state
    return (
      <div style={styles.container}>
        <div>
          <h3>LOGIN</h3>
          <div>
            <span>Email </span>
            <input
              type='text'
              name='email'
              value={email}
              onChange={this._handleEmailChange}
            />
          </div>
          <div>
            <span>Password </span>
            <input
              type='password'
              name='password'
              value={password}
              onChange={this._handlePwdChange}
            />
          </div>
          <button
            onClick={this._onButtonClick}
          >Log me in</button>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  logUserIn: PropTypes.func.isRequired
}

const styles = {
  container: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (credentials) => dispatch(login(credentials))
})

export default connect(null, mapDispatchToProps)(Login)
