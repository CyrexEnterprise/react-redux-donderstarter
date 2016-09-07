import React from 'react';
import { Link } from 'react-router';
import './style.scss';

const NotFound = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFound;
