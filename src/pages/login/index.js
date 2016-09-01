import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const redirectRoute = props => props.location.query.next || '/login';

export class LoginPage extends React.Component {

  login(e) {
      e.preventDefault();
      this.props.login({
        redirectTo: redirectRoute(this.props)
      });
  }

  render () {
    return (
      <div>
        {this.props.statusText ? <div>{this.props.statusText}</div> : ''}
        <button
        disabled={this.props.isAuthenticating}
        onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

export default connect(mapStateToProps, { login })(LoginPage);
