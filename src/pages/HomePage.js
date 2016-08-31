import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { fetch } from '../actions/baseActions';

const mapStateToProps = ({ users }) => ({
  users: users.data
})

class HomePage extends React.Component {

  componentDidMount() {
      this.props.fetch('USERS');
  }

  render() {
    return (
      <div>
        <h1>React Slingshot</h1>

        <h2>Get Started</h2>
        <ol>
          <li>Review the <Link to="fuel-savings">demo app</Link></li>
          {this.props.users.map(user => <div key={user.id}>{user.id}</div> )}
          <li>Remove the demo and start coding: npm run remove-demo</li>
        </ol>
      </div>
    );
  }
};

export default connect(mapStateToProps, { fetch })(HomePage);
