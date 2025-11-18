import React from 'react';
import { authService } from '../services/authService';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const AuthRoute = () => {
  const isAuthenticated = authService.isAuthenticated();
  
  return isAuthenticated ? <Dashboard /> : <Home />;
};

export default AuthRoute;