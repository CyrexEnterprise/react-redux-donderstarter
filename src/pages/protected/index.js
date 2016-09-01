import React from 'react';
import { Link } from 'react-router';
import './style.scss';

const ProtectedPage = () => {
  return (
    <div>
      <h4>
        Protected Page
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default ProtectedPage;
