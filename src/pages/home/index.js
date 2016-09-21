import React from 'react';
import { connect } from 'react-redux';
import { fetch } from '../../actions/baseActions';
import './style.scss';

const mapStateToProps = ({ users }) => ({
  users: users.data
});

export class Home extends React.Component {

  componentDidMount() {
    this.props.fetch('USERS');
  }

  render() {
    return (
      <div className="root">
        <h1>React / Redux DonderStarter</h1>
        <small>If you're reading the user list, it means it's working!</small>
        <ol>
          { this.props.users.map(user => <li key={user.id}>{user.first_name} {user.last_name}</li>) }
        </ol>
      </div>
    );
  }
}

Home.propTypes = {
  fetch: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, { fetch })(Home);
