import 'react-app-polyfill/ie11';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Example from './src/example';
import Dashboard from './src/dashboard';
import  baseRelativePath from './src/dashboard/BasePath';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path={`${baseRelativePath}/`} element={<Example />} />
        <Route path={`${baseRelativePath}/dashboard/*`} element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
