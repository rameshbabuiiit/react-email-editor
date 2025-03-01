import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DesignList from './DesignList';
import DesignEdit from './DesignEdit';
import  baseRelativePath from './BasePath';

const Dashboard = () => {
  return (
    <Routes>
      <Route path={`${baseRelativePath}/`} element={<DesignList />} />
      <Route path={`${baseRelativePath}/design/new`} element={<DesignEdit />} />
      <Route path={`${baseRelativePath}/design/edit/:designId`} element={<DesignEdit />} />
    </Routes>
  );
};

export default Dashboard;
