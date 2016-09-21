import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './style.scss';

class LandingPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(push('/app'));
  }

  render() {
    return (
      <div className="root">Loading...</div>
    );
  }
}

LandingPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(LandingPage);
