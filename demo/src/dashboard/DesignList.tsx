import React from 'react';
import { Link } from 'react-router-dom';
import baseRelativePath from './BasePath';

const DesignList = () => {
  return (
    <div>
      <h1>My Designs</h1>

      <p>
        <Link to={`${baseRelativePath}/dashboard/design/new`}>New Design</Link>
      </p>
    </div>
  );
};

export default DesignList;
