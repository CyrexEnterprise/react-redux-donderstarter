import React, { PropTypes } from 'react';

const Auth = (props) => {
  return (
    <div>
      { props.isAuthenticated ? props.children : 'Loading...' }
    </div>
  );
};

Auth.propTypes = {
  children: PropTypes.element
};

export default Auth;
