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
        <h1>React / Redux DonderStarter</h1>

        <ol>
          {this.props.users.map(user => <li key={user.id}>{user.id}</li> )}
        </ol>
      </div>
    );
  }
};

export default connect(mapStateToProps, { fetch })(HomePage);