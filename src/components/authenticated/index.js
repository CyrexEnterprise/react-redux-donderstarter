import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetch } from '../../actions/baseActions';

export class AuthenticatedComponent extends React.Component {

  componentWillMount() {
    this.authorize();
  }

  authorize(isValidating) {

    if (isValidating)  return;

    // Check localstorage and state for token
    let token = this.props.token || window.localStorage.getItem('token');

    // if it does exist, request session data
    // if it doesn't exist, do the redirect to login
    if (token && token.length >= 6)
      this.getSession();
    else
      this.redirect();
  }

  // if session promiss is fullfilled, set authenticated to true (authReducer is catching the promiss)
  // if session promiss is rejected, do the redirect to login
  getSession() {
    this.props.dispatch(fetch('SESSION'))
      .then(null, this.redirect);
  }

  redirect() {
    let redirectAfterLogin = this.props.location.pathname;
    this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
  }

  render() {
    return <this.props.component {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isValidated: state.session.isValidated,
  isValidating: state.session.isValidating,
  statusText: state.session.statusText
});

export default connect(mapStateToProps)(AuthenticatedComponent);
