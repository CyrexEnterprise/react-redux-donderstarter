import * as React from 'react'

import './styles.scss'
import { LoginProps } from './types'

class Login extends React.Component<LoginProps> {
  public state = { email: '', password: '' }

  public render () {
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
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <span>Password </span>
            <input
              type='password'
              name='password'
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleBtnClick}>Log me in</button>
        </div>
      </div>
    )
  }

  private handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  private handleBtnClick = () => {
    const { email, password } = this.state

    if (email.length && password.length) {
      this.props.logUserIn({ email, password })
    }
  }
}

export default Login
