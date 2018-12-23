import React, { Component } from 'react'
import { func } from 'prop-types'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  inputChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  onButtonClick = () => {
    const { email, password } = this.state

    if (email.length && password.length) {
      this.props.logUserIn({ email, password })
    }
  }

  render () {
    const { email, password } = this.state
    return (
      <div className='login'>
        <div>
          <h3>LOGIN</h3>
          <div>
            <span>Email </span>
            <input
              type='text'
              name='email'
              value={email}
              onChange={this.inputChange}
            />
          </div>
          <div>
            <span>Password </span>
            <input
              type='password'
              name='password'
              value={password}
              onChange={this.inputChange}
            />
          </div>
          <button onClick={this.onButtonClick}>Log me in</button>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  logUserIn: func.isRequired,
}

export default Login
