import React, { PropTypes } from 'react';

const Auth = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

Auth.propTypes = {
  children: PropTypes.element
};

export default Auth;
